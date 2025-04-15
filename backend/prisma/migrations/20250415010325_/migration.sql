/*
  Warnings:

  - You are about to drop the `_SkillsToLearn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SkillsToLearn" DROP CONSTRAINT "_SkillsToLearn_A_fkey";

-- DropForeignKey
ALTER TABLE "_SkillsToLearn" DROP CONSTRAINT "_SkillsToLearn_B_fkey";

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "isLearning" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_SkillsToLearn";
