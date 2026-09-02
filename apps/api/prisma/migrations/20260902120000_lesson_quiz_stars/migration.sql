-- AlterTable
ALTER TABLE "QuizResult" ADD COLUMN "stars" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "QuizResult" ADD COLUMN "timeSpentSec" INTEGER;
ALTER TABLE "QuizResult" ADD COLUMN "passed" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "QuizResult" ADD COLUMN "questionIds" JSONB NOT NULL DEFAULT '[]';

-- CreateTable
CREATE TABLE "QuizSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "questionIds" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizSession_userId_quizId_idx" ON "QuizSession"("userId", "quizId");

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
