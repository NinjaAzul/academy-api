/*
  Warnings:

  - You are about to drop the column `userId` on the `groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_userId_fkey";

-- DropIndex
DROP INDEX "groups_userId_key";

-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "velocity" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL,
ALTER COLUMN "series" DROP NOT NULL,
ALTER COLUMN "repetition" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON "_GroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
