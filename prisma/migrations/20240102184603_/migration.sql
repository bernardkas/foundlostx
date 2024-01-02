/*
  Warnings:

  - You are about to drop the column `InCity` on the `LostAndFound` table. All the data in the column will be lost.
  - You are about to drop the column `airoport` on the `LostAndFound` table. All the data in the column will be lost.
  - You are about to drop the column `buss` on the `LostAndFound` table. All the data in the column will be lost.
  - You are about to drop the column `hotel` on the `LostAndFound` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "LostAndFound_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "LostAndFound" DROP COLUMN "InCity";
ALTER TABLE "LostAndFound" DROP COLUMN "airoport";
ALTER TABLE "LostAndFound" DROP COLUMN "buss";
ALTER TABLE "LostAndFound" DROP COLUMN "hotel";
ALTER TABLE "LostAndFound" ALTER COLUMN "name" DROP NOT NULL;
ALTER TABLE "LostAndFound" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" STRING NOT NULL;
ALTER TABLE "User" ADD COLUMN     "username" STRING;
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastname" DROP NOT NULL;
