-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN "checkpointKey" TEXT NOT NULL DEFAULT 'bases';
ALTER TABLE "Lesson" ADD COLUMN "checkpointTitle" TEXT NOT NULL DEFAULT 'Bases';
ALTER TABLE "Lesson" ADD COLUMN "checkpointOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Lesson_categoryId_checkpointOrder_idx" ON "Lesson"("categoryId", "checkpointOrder");
