/*
  Warnings:

  - You are about to drop the column `userId` on the `auditlog` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "auditlog_userId_idx";

-- AlterTable
ALTER TABLE "auditlog" DROP COLUMN "userId";
