-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_senderId_fkey";

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
