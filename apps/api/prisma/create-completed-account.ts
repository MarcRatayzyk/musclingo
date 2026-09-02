/**
 * Crée (ou met à jour) un compte utilisateur avec absolument tout complété :
 * toutes les leçons lues, tous les quiz réussis à 100 %, tous les checkpoints
 * passés. Utilise les vrais services Nest (LessonsService/QuizzesService/
 * CheckpointsService) pour que XP, niveau, streak et badges restent cohérents
 * avec une vraie partie jouée.
 *
 * Usage : depuis apps/api →
 *   pnpm exec tsx prisma/create-completed-account.ts
 * Variables optionnelles : ACCOUNT_EMAIL, ACCOUNT_PASSWORD, ACCOUNT_NAME
 */
import { NestFactory } from "@nestjs/core";
import * as bcrypt from "bcrypt";
import { LESSON_QUIZ_QUESTION_COUNT } from "@muscle-mind/types";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { LessonsService } from "../src/modules/lessons/lessons.service";
import { QuizzesService } from "../src/modules/quizzes/quizzes.service";
import { QuestionPoolService } from "../src/modules/questions/question-pool.service";
import { CheckpointsService } from "../src/modules/checkpoints/checkpoints.service";

async function main() {
  const email = process.env.ACCOUNT_EMAIL ?? "alldone@musclemind.app";
  const password = process.env.ACCOUNT_PASSWORD ?? "AllDone123!";
  const displayName = process.env.ACCOUNT_NAME ?? "Compte Complet";

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ["error", "warn"],
  });

  const prisma = app.get(PrismaService);
  const lessonsService = app.get(LessonsService);
  const quizzesService = app.get(QuizzesService);
  const questionPool = app.get(QuestionPoolService);
  const checkpointsService = app.get(CheckpointsService);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "USER" },
    create: {
      email,
      passwordHash,
      displayName,
      role: "USER",
      streak: { create: {} },
    },
  });

  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  let lessonCount = 0;
  let gateCount = 0;

  for (const category of categories) {
    const categoryLessons = await prisma.lesson.findMany({
      where: { categoryId: category.id, status: "PUBLISHED" },
      orderBy: { order: "asc" },
    });
    const gates = await prisma.checkpointGate.findMany({
      where: { categoryId: category.id },
    });

    for (const lesson of categoryLessons) {
      await lessonsService.complete(lesson.id, user.id, {});

      const quiz = await prisma.quiz.findUnique({
        where: { lessonId: lesson.id },
      });

      if (quiz) {
        const alreadyPassed = await prisma.quizResult.findFirst({
          where: { userId: user.id, quizId: quiz.id, stars: 3 },
          select: { id: true },
        });
        if (!alreadyPassed) {
          const session = await quizzesService.getByLessonId(lesson.id, user.id);
          const internal = await questionPool.resolveSessionQuestions(
            session.sessionId,
            user.id,
            quiz.id,
          );
          const totalTimeSpentSec = 30;
          const answers = internal.map((q) => ({
            questionId: q.id,
            selectedAnswerIds: [q.correctChoiceId],
            timeSpentSec: 3,
          }));
          await quizzesService.submit(quiz.id, user.id, {
            sessionId: session.sessionId,
            answers,
            totalTimeSpentSec,
          });
        }
      }
      lessonCount += 1;

      const isLastOfUnit = !categoryLessons.some(
        (l) => l.checkpointOrder === lesson.checkpointOrder && l.order > lesson.order,
      );
      if (!isLastOfUnit) continue;

      const gate = gates.find((g) => g.checkpointOrder === lesson.checkpointOrder);
      if (!gate) continue;

      const alreadyPassedGate = await prisma.checkpointGateResult.findFirst({
        where: { userId: user.id, gateId: gate.id, passed: true },
        select: { id: true },
      });
      if (!alreadyPassedGate) {
        const gateWithQuestions = await prisma.checkpointGate.findUnique({
          where: { id: gate.id },
          include: {
            questions: { include: { answers: true }, orderBy: { order: "asc" } },
          },
        });
        if (gateWithQuestions) {
          const answers = gateWithQuestions.questions.map((q) => {
            const correct = q.answers.find((a) => a.isCorrect);
            return { questionId: q.id, selectedAnswerIds: correct ? [correct.id] : [] };
          });
          await checkpointsService.submit(gate.id, user.id, {
            answers,
            timeSpentSec: 30,
          });
        }
      }
      gateCount += 1;
    }
  }

  const finalUser = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    include: { badges: { include: { badge: true } } },
  });

  await app.close();

  console.log("Compte prêt :", email, "/", password);
  console.log("Leçons complétées :", lessonCount);
  console.log("Checkpoints passés :", gateCount);
  console.log("XP total :", finalUser.xpTotal, "— Niveau :", finalUser.level);
  console.log(
    "Badges :",
    finalUser.badges.map((b) => b.badge.code).join(", ") || "aucun",
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
