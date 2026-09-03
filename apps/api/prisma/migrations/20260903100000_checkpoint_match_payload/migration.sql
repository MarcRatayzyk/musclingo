-- AlterTable
ALTER TABLE "CheckpointQuestion" ADD COLUMN "payload" JSONB;

-- AlterTable
ALTER TABLE "CheckpointAnswer" ADD COLUMN "matchKey" TEXT;
