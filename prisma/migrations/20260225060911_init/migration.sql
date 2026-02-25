/*
  Warnings:

  - You are about to drop the column `entity` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `newData` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `oldData` on the `auditlog` table. All the data in the column will be lost.
  - Added the required column `model` to the `auditlog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordId` to the `auditlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auditlog" DROP COLUMN "entity",
DROP COLUMN "entityId",
DROP COLUMN "newData",
DROP COLUMN "oldData",
ADD COLUMN     "after" JSONB,
ADD COLUMN     "before" JSONB,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "recordId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "auditlog_model_recordId_idx" ON "auditlog"("model", "recordId");

-- CreateIndex
CREATE INDEX "auditlog_userId_idx" ON "auditlog"("userId");
