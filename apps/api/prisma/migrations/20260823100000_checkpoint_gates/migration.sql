-- CreateTable
CREATE TABLE "CheckpointGate" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "checkpointKey" TEXT NOT NULL,
    "checkpointOrder" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "timeLimitSec" INTEGER NOT NULL DEFAULT 60,
    "passThreshold" DOUBLE PRECISION NOT NULL DEFAULT 0.9,
    "questionCount" INTEGER NOT NULL DEFAULT 20,
    "xpReward" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CheckpointGate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckpointQuestion" (
    "id" TEXT NOT NULL,
    "gateId" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "prompt" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CheckpointQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckpointAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CheckpointAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckpointGateResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gateId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "timeSpentSec" INTEGER NOT NULL,
    "xpEarned" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckpointGateResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckpointGate_categoryId_checkpointKey_key" ON "CheckpointGate"("categoryId", "checkpointKey");

-- CreateIndex
CREATE INDEX "CheckpointGate_categoryId_checkpointOrder_idx" ON "CheckpointGate"("categoryId", "checkpointOrder");

-- CreateIndex
CREATE INDEX "CheckpointQuestion_gateId_order_idx" ON "CheckpointQuestion"("gateId", "order");

-- CreateIndex
CREATE INDEX "CheckpointAnswer_questionId_order_idx" ON "CheckpointAnswer"("questionId", "order");

-- CreateIndex
CREATE INDEX "CheckpointGateResult_userId_gateId_idx" ON "CheckpointGateResult"("userId", "gateId");

-- AddForeignKey
ALTER TABLE "CheckpointGate" ADD CONSTRAINT "CheckpointGate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckpointQuestion" ADD CONSTRAINT "CheckpointQuestion_gateId_fkey" FOREIGN KEY ("gateId") REFERENCES "CheckpointGate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckpointAnswer" ADD CONSTRAINT "CheckpointAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CheckpointQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckpointGateResult" ADD CONSTRAINT "CheckpointGateResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckpointGateResult" ADD CONSTRAINT "CheckpointGateResult_gateId_fkey" FOREIGN KEY ("gateId") REFERENCES "CheckpointGate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
