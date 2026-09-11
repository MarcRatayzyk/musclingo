import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  EXTRA_QUIZ_TIME_SEC,
  SubmitCheckpointGateInput,
  isGateScorePassing,
} from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";
import { PathService } from "../categories/path.service";
import { GamificationService } from "../gamification/gamification.service";
import { isMatchSelectionCorrect } from "../questions/match-score";
import { UsersService } from "../users/users.service";
import {
  AppLocale,
  pickLocalized,
  resolveRequestLocale,
} from "../../common/locale";
import { pickCheckpointTitle } from "../../common/content-l10n";

@Injectable()
export class CheckpointsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamification: GamificationService,
    private readonly path: PathService,
    private readonly users: UsersService,
  ) {}

  async getById(gateId: string, userId: string, localeHeader?: string) {
    const locale = await this.resolveLocale(userId, localeHeader);
    await this.path.assertGateUnlocked(gateId, userId);

    const gate = await this.prisma.checkpointGate.findUnique({
      where: { id: gateId },
      include: {
        category: { select: { slug: true, name: true, nameEn: true } },
        questions: {
          orderBy: { order: "asc" },
          include: {
            answers: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                label: true,
                labelEn: true,
                order: true,
                matchKey: true,
              },
            },
          },
        },
      },
    });

    if (!gate) throw new NotFoundException("Checkpoint gate not found");

    const inv = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { extraTimeCharges: true },
    });

    return {
      id: gate.id,
      title: pickCheckpointTitle(gate.title, gate.titleEn, locale),
      categorySlug: gate.category.slug,
      categoryName: pickLocalized(gate.category.name, gate.category.nameEn, locale),
      timeLimitSec: gate.timeLimitSec,
      extraTimeBonusSec: EXTRA_QUIZ_TIME_SEC,
      extraTimeCharges: inv.extraTimeCharges,
      passThreshold: gate.passThreshold,
      questionCount: gate.questionCount,
      xpReward: gate.xpReward,
      questions: gate.questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: pickLocalized(q.prompt, q.promptEn, locale),
        explanation: pickLocalized(
          q.explanation,
          q.explanationEn,
          locale,
        ),
        order: q.order,
        payload: q.payload,
        answers: q.answers.map((a) => ({
          id: a.id,
          label: pickLocalized(a.label, a.labelEn, locale),
          order: a.order,
          matchKey: a.matchKey,
        })),
      })),
    };
  }

  async submit(
    gateId: string,
    userId: string,
    input: SubmitCheckpointGateInput,
    localeHeader?: string,
  ) {
    const locale = await this.resolveLocale(userId, localeHeader);
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
      const selected = submission?.selectedAnswerIds ?? [];

      let correctAnswerIds: string[];
      let isCorrect: boolean;

      if (question.type === "MATCH") {
        correctAnswerIds = [];
        isCorrect = isMatchSelectionCorrect(question.answers, selected);
      } else if (question.type === "MULTI") {
        correctAnswerIds = question.answers
          .filter((a) => a.isCorrect)
          .map((a) => a.id)
          .sort();
        const selectedSorted = [...selected].sort();
        isCorrect =
          selectedSorted.length === correctAnswerIds.length &&
          correctAnswerIds.length > 0 &&
          selectedSorted.every((id, i) => id === correctAnswerIds[i]);
      } else if (question.type === "ORDER") {
        correctAnswerIds = [...question.answers]
          .sort((a, b) => a.order - b.order)
          .map((a) => a.id);
        isCorrect =
          selected.length === correctAnswerIds.length &&
          correctAnswerIds.length > 0 &&
          selected.every((id, i) => id === correctAnswerIds[i]);
      } else {
        correctAnswerIds = question.answers
          .filter((a) => a.isCorrect)
          .map((a) => a.id)
          .sort();
        isCorrect =
          selected.length === 1 &&
          correctAnswerIds.length === 1 &&
          selected[0] === correctAnswerIds[0];
      }

      if (isCorrect) correctCount += 1;

      return {
        questionId: question.id,
        isCorrect,
        explanation: pickLocalized(
          question.explanation,
          question.explanationEn,
          locale,
        ),
        correctAnswerIds,
      };
    });

    const useExtraTime = !!input.useExtraTime;
    let effectiveLimit = gate.timeLimitSec;
    if (useExtraTime) {
      await this.users.consumeExtraTimeCharge(userId);
      effectiveLimit = gate.timeLimitSec + EXTRA_QUIZ_TIME_SEC;
    }

    const score = correctCount / gate.questions.length;
    const timedOut = input.timeSpentSec >= effectiveLimit;
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

  private async resolveLocale(
    userId: string,
    localeHeader?: string,
  ): Promise<AppLocale> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { locale: true },
    });
    return resolveRequestLocale({ "x-locale": localeHeader }, user?.locale);
  }
}
