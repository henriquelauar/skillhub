-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_skillId_fkey";

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
