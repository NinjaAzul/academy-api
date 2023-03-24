/*
  Warnings:

  - You are about to drop the column `description` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `groups` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "groups_name_key";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "groups_userId_key" ON "groups"("userId");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
