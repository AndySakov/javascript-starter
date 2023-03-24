/*
  Warnings:

  - Added the required column `max` to the `temperatures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min` to the `temperatures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "temperatures" ADD COLUMN     "max" INTEGER NOT NULL,
ADD COLUMN     "min" INTEGER NOT NULL;
