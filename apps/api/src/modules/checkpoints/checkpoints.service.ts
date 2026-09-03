import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  GATE_PASS_THRESHOLD,
  SubmitCheckpointGateInput,
  isGateScorePassing,
} from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";
import { PathService } from "../categories/path.service";
import { GamificationService } from "../gamification/gamification.service";
import { isMatchSelectionCorrect } from "../questions/match-score";

@Injectable()
export class CheckpointsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamification: GamificationService,
    private readonly path: PathService,
  ) {}

  async getById(gateId: string, userId: string) {
    await this.path.assertGateUnlocked(gateId, userId);

    const gate = await this.prisma.checkpointGate.findUnique({
      where: { id: gateId },
      include: {
        category: { select: { slug: true, name: true } },
        questions: {
          orderBy: { order: "asc" },
          include: {
            answers: {
              orderBy: { order: "asc" },
              select: { id: true, label: true, order: true, matchKey: true },
            },
          },
        },
      },
    });

    if (!gate) throw new NotFoundException("Checkpoint gate not found");

    return {
      id: gate.id,
      title: gate.title,
      categorySlug: gate.category.slug,
      categoryName: gate.category.name,
      timeLimitSec: gate.timeLimitSec,
      passThreshold: gate.passThreshold,
      questionCount: gate.questionCount,
      xpReward: gate.xpReward,
      questions: gate.questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        order: q.order,
        payload: q.payload,
        answers: q.answers.map((a) => ({
          id: a.id,
          label: a.label,
          order: a.order,
          matchKey: a.matchKey,
        })),
      })),
    };
  }

  async submit(gateId: string, userId: string, input: SubmitCheckpointGateInput) {
    const gate = await this.prisma.checkpointGate.findUnique({
      where: { id: gateId },
      include: {
        questions: { include: { answers: true }, orderBy: { order: "asc" } },
      },
    });

    if (!gate) throw new NotFoundException("Checkpoint gate not found");

    await this.path.assertGateUnlocked(gateId, userId);

    if (input.answers.length > gate.questions.length) {
      throw new BadRequestException("Too many answers");
    }

    const knownIds = new Set(gate.questions.map((q) => q.id));
    for (const answer of input.answers) {
      if (!knownIds.has(answer.questionId)) {
        throw new BadRequestException("Unknown question in submission");
      }
    }

    const answerMap = new Map(
      input.answers.map((a) => [a.questionId, a]),
    );

    let correctCount = 0;
    const feedback = gate.questions.map((question) => {
      const submission = answerMap.get(question.id);
      const correctIds = question.answers
        .filter((a) => a.isCorrect)
        .map((a) => a.id)
        .sort();

      const isCorrect =
        question.type === "MATCH"
          ? isMatchSelectionCorrect(
              question.answers,
              submission?.selectedAnswerIds ?? [],
            )
          : !!submission &&
            submission.selectedAnswerIds.length === 1 &&
            correctIds.length === 1 &&
            submission.selectedAnswerIds[0] === correctIds[0];

      if (isCorrect) correctCount += 1;

      return {
        questionId: question.id,
        isCorrect,
        explanation: question.explanation,
        correctAnswerIds: correctIds,
      };
    });

    const score = correctCount / gate.questions.length;
    const timedOut = input.timeSpentSec >= gate.timeLimitSec;
    const passed =
      !timedOut &&
      isGateScorePassing(
        score,
        gate.questions.length,
        gate.passThreshold,
      );
    const xpEarned = passed ? gate.xpReward : Math.round(gate.xpReward * score);

    await this.prisma.checkpointGateResult.create({
      data: {
        userId,
        gateId,
        score,
        passed,
        timeSpentSec: input.timeSpentSec,
        xpEarned,
        answers: input.answers,
      },
    });

    let xpTotal = 0;
    let level = 1;
    if (xpEarned > 0) {
      const xp = await this.gamification.awardXp({
        userId,
        amount: xpEarned,
        reason: passed ? "checkpoint_passed" : "checkpoint_attempt",
        refType: "checkpoint_gate",
        refId: gateId,
      });
      xpTotal = xp.xpTotal;
      level = xp.level;
    } else {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { xpTotal: true, level: true },
      });
      xpTotal = user?.xpTotal ?? 0;
      level = user?.level ?? 1;
    }

    const nextGate = await this.prisma.checkpointGate.findFirst({
      where: {
        categoryId: gate.categoryId,
        checkpointOrder: gate.checkpointOrder + 1,
      },
      select: { id: true },
    });

    const firstLessonNextUnit = passed
      ? await this.path.getFirstLessonAfterGate(
          gate.categoryId,
          gate.checkpointOrder,
          userId,
        )
      : null;

    return {
      gateId,
      score,
      passed,
      passThreshold: gate.passThreshold,
      correctCount,
      totalQuestions: gate.questions.length,
      timeSpentSec: input.timeSpentSec,
      xpEarned,
      xpTotal,
      level,
      feedback,
      nextGateId: nextGate?.id ?? null,
      nextLessonId: firstLessonNextUnit,
      categoryId: gate.categoryId,
      timedOut,
    };
  }
}
