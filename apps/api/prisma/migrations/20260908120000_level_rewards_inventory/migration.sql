-- AlterTable
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "quizHints" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "extraTimeCharges" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "streakFreezes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "QuizSession" ADD COLUMN IF NOT EXISTS "extraTimeUsed" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "QuizSession" ADD COLUMN IF NOT EXISTS "hintedQuestionIds" JSONB;

-- CreateTable
CREATE TABLE IF NOT EXISTS "LevelRewardClaim" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LevelRewardClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "LevelRewardClaim_userId_level_key" ON "LevelRewardClaim"("userId", "level");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "LevelRewardClaim_userId_idx" ON "LevelRewardClaim"("userId");

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "LevelRewardClaim" ADD CONSTRAINT "LevelRewardClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
