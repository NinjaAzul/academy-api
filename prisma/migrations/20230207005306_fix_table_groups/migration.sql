/*
  Warnings:

  - You are about to drop the `_GroupToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_B_fkey";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "_GroupToUser";

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
