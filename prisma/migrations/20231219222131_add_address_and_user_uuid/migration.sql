/*
  Warnings:

  - Added the required column `address` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uuid" TEXT NOT NULL;
