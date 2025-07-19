/*
  Warnings:

  - Added the required column `last_modified` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_modified` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_modified" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "last_modified" TIMESTAMP(3) NOT NULL;
