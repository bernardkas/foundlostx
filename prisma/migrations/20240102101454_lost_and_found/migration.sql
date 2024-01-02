/*
  Warnings:

  - Added the required column `exatLocation` to the `Found` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exatLocation` to the `Lost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "Lost_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Found" ADD COLUMN     "exatLocation" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Lost" ADD COLUMN     "exatLocation" STRING NOT NULL;
