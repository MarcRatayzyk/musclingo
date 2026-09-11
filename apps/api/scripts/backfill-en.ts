/**
 * Backfill empty *En columns from FR content so EN locale is served from DB.
 * Usage (from apps/api): pnpm exec tsx scripts/backfill-en.ts
 */
import { PrismaClient } from "@prisma/client";
import { enOrTranslate } from "../src/common/auto-en";
import {
  pickCheckpointTitle,
  pickLessonSubtitle,
  pickLessonTitle,
} from "../src/common/content-l10n";
import { LESSON_MARKDOWN_EN_BY_TITLE } from "../src/common/lesson-markdown-en";

const prisma = new PrismaClient();

async function main() {
  const lessons = await prisma.lesson.findMany({
    select: {
      id: true,
      title: true,
      titleEn: true,
      subtitle: true,
      subtitleEn: true,
      markdown: true,
      markdownEn: true,
      checkpointTitle: true,
      checkpointTitleEn: true,
    },
  });

  let lessonsUpdated = 0;
  for (const lesson of lessons) {
    const titleEn =
      lesson.titleEn?.trim() ||
      pickLessonTitle(lesson.title, null, "en");
    const subtitleEn =
      lesson.subtitleEn?.trim() ||
      (lesson.subtitle
        ? pickLessonSubtitle(lesson.subtitle, null, "en")
        : null);
    const markdownEn =
      lesson.markdownEn?.trim() ||
      LESSON_MARKDOWN_EN_BY_TITLE[lesson.title] ||
      enOrTranslate(lesson.markdown);
    const checkpointTitleEn =
      lesson.checkpointTitleEn?.trim() ||
      (lesson.checkpointTitle
        ? pickCheckpointTitle(lesson.checkpointTitle, null, "en")
        : null);

    if (
      titleEn !== lesson.titleEn ||
      subtitleEn !== lesson.subtitleEn ||
      markdownEn !== lesson.markdownEn ||
      checkpointTitleEn !== lesson.checkpointTitleEn
    ) {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: {
          titleEn,
          subtitleEn,
          markdownEn,
          checkpointTitleEn,
        },
      });
      lessonsUpdated += 1;
    }
  }

  const questions = await prisma.question.findMany({
    select: {
      id: true,
      prompt: true,
      promptEn: true,
      explanation: true,
      explanationEn: true,
    },
  });
  let questionsUpdated = 0;
  for (const q of questions) {
    const promptEn = q.promptEn?.trim() || enOrTranslate(q.prompt);
    const explanationEn =
      q.explanationEn?.trim() || enOrTranslate(q.explanation);
    if (promptEn !== q.promptEn || explanationEn !== q.explanationEn) {
      await prisma.question.update({
        where: { id: q.id },
        data: { promptEn, explanationEn },
      });
      questionsUpdated += 1;
    }
  }

  const answers = await prisma.answer.findMany({
    select: { id: true, label: true, labelEn: true },
  });
  let answersUpdated = 0;
  for (const a of answers) {
    const labelEn = a.labelEn?.trim() || enOrTranslate(a.label);
    if (labelEn !== a.labelEn) {
      await prisma.answer.update({
        where: { id: a.id },
        data: { labelEn },
      });
      answersUpdated += 1;
    }
  }

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, nameEn: true, slug: true },
  });
  const catEn: Record<string, string> = {
    anatomie: "Anatomy",
    nutrition: "Nutrition",
    biomecanique: "Biomechanics",
    programmation: "Programming",
    recuperation: "Recovery",
  };
  let catsUpdated = 0;
  for (const c of categories) {
    const nameEn = c.nameEn?.trim() || catEn[c.slug] || enOrTranslate(c.name);
    if (nameEn !== c.nameEn) {
      await prisma.category.update({
        where: { id: c.id },
        data: { nameEn },
      });
      catsUpdated += 1;
    }
  }

  const gates = await prisma.checkpointGate.findMany({
    select: { id: true, title: true, titleEn: true },
  });
  let gatesUpdated = 0;
  for (const g of gates) {
    const titleEn =
      g.titleEn?.trim() || pickCheckpointTitle(g.title, null, "en");
    if (titleEn !== g.titleEn) {
      await prisma.checkpointGate.update({
        where: { id: g.id },
        data: { titleEn },
      });
      gatesUpdated += 1;
    }
  }

  const miniQs = await prisma.miniGameQuestion.findMany({
    select: {
      id: true,
      prompt: true,
      promptEn: true,
      explanation: true,
      explanationEn: true,
    },
  });
  let miniQUpdated = 0;
  for (const q of miniQs) {
    const promptEn = q.promptEn?.trim() || enOrTranslate(q.prompt);
    const explanationEn =
      q.explanationEn?.trim() || enOrTranslate(q.explanation);
    if (promptEn !== q.promptEn || explanationEn !== q.explanationEn) {
      await prisma.miniGameQuestion.update({
        where: { id: q.id },
        data: { promptEn, explanationEn },
      });
      miniQUpdated += 1;
    }
  }

  const miniAs = await prisma.miniGameAnswer.findMany({
    select: { id: true, label: true, labelEn: true },
  });
  let miniAUpdated = 0;
  for (const a of miniAs) {
    const labelEn = a.labelEn?.trim() || enOrTranslate(a.label);
    if (labelEn !== a.labelEn) {
      await prisma.miniGameAnswer.update({
        where: { id: a.id },
        data: { labelEn },
      });
      miniAUpdated += 1;
    }
  }

  console.log(
    JSON.stringify({
      lessonsUpdated,
      questionsUpdated,
      answersUpdated,
      catsUpdated,
      gatesUpdated,
      miniQUpdated,
      miniAUpdated,
    }),
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
