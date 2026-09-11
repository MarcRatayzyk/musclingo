-- AlterTable
ALTER TABLE "QuizSession" ADD COLUMN IF NOT EXISTS "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill existing rows from createdAt when present
UPDATE "QuizSession" SET "startedAt" = "createdAt" WHERE "startedAt" IS DISTINCT FROM "createdAt";

-- CreateIndex
CREATE INDEX IF NOT EXISTS "XpTransaction_userId_reason_idx" ON "XpTransaction"("userId", "reason");

-- Partial unique: one streak-goal claim per user/reason (allows other repeated reasons)
CREATE UNIQUE INDEX IF NOT EXISTS "XpTransaction_streak_goal_claim_unique"
ON "XpTransaction" ("userId", "reason")
WHERE "reason" LIKE 'streak_goal_claim_%';
