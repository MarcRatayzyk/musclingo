-- CreateTable
CREATE TABLE "MiniGameQuestion" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "checkpointKey" TEXT,
    "type" "QuestionType" NOT NULL,
    "prompt" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "payload" JSONB,

    CONSTRAINT "MiniGameQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniGameAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MiniGameAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniGameResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "gameKey" TEXT NOT NULL DEFAULT 'flash-quiz',
    "durationSec" INTEGER NOT NULL,
    "correctCount" INTEGER NOT NULL,
    "wrongCount" INTEGER NOT NULL,
    "bestCombo" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL,
    "endedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MiniGameResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MiniGameQuestion_categoryId_order_idx" ON "MiniGameQuestion"("categoryId", "order");

-- CreateIndex
CREATE INDEX "MiniGameAnswer_questionId_order_idx" ON "MiniGameAnswer"("questionId", "order");

-- CreateIndex
CREATE INDEX "MiniGameResult_userId_categoryId_score_idx" ON "MiniGameResult"("userId", "categoryId", "score");

-- AddForeignKey
ALTER TABLE "MiniGameQuestion" ADD CONSTRAINT "MiniGameQuestion_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniGameAnswer" ADD CONSTRAINT "MiniGameAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "MiniGameQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniGameResult" ADD CONSTRAINT "MiniGameResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniGameResult" ADD CONSTRAINT "MiniGameResult_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
