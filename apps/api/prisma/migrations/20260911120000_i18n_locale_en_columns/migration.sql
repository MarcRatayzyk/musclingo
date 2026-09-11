-- AlterTable User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "locale" TEXT NOT NULL DEFAULT 'fr';

-- AlterTable Category
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "nameEn" TEXT;

-- AlterTable Lesson
ALTER TABLE "Lesson"
  ADD COLUMN IF NOT EXISTS "titleEn" TEXT,
  ADD COLUMN IF NOT EXISTS "subtitleEn" TEXT,
  ADD COLUMN IF NOT EXISTS "markdownEn" TEXT,
  ADD COLUMN IF NOT EXISTS "checkpointTitleEn" TEXT;

-- AlterTable Question
ALTER TABLE "Question"
  ADD COLUMN IF NOT EXISTS "promptEn" TEXT,
  ADD COLUMN IF NOT EXISTS "explanationEn" TEXT;

-- AlterTable Answer
ALTER TABLE "Answer" ADD COLUMN IF NOT EXISTS "labelEn" TEXT;

-- AlterTable Badge
ALTER TABLE "Badge"
  ADD COLUMN IF NOT EXISTS "nameEn" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT;

-- AlterTable Achievement
ALTER TABLE "Achievement"
  ADD COLUMN IF NOT EXISTS "nameEn" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT;

-- AlterTable Notification
ALTER TABLE "Notification"
  ADD COLUMN IF NOT EXISTS "titleEn" TEXT,
  ADD COLUMN IF NOT EXISTS "bodyEn" TEXT;

-- AlterTable CheckpointGate
ALTER TABLE "CheckpointGate" ADD COLUMN IF NOT EXISTS "titleEn" TEXT;

-- AlterTable CheckpointQuestion
ALTER TABLE "CheckpointQuestion"
  ADD COLUMN IF NOT EXISTS "promptEn" TEXT,
  ADD COLUMN IF NOT EXISTS "explanationEn" TEXT;

-- AlterTable CheckpointAnswer
ALTER TABLE "CheckpointAnswer" ADD COLUMN IF NOT EXISTS "labelEn" TEXT;

-- AlterTable MiniGameQuestion
ALTER TABLE "MiniGameQuestion"
  ADD COLUMN IF NOT EXISTS "promptEn" TEXT,
  ADD COLUMN IF NOT EXISTS "explanationEn" TEXT;

-- AlterTable MiniGameAnswer
ALTER TABLE "MiniGameAnswer" ADD COLUMN IF NOT EXISTS "labelEn" TEXT;
