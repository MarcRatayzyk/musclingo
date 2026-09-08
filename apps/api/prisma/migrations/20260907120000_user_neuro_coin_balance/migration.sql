-- AlterTable
ALTER TABLE "User" ADD COLUMN "neuroCoinBalance" INTEGER NOT NULL DEFAULT 0;

-- Migrate former spendable star balance into NeuroCoins
UPDATE "User" SET "neuroCoinBalance" = "starBalance" WHERE "starBalance" > 0;
