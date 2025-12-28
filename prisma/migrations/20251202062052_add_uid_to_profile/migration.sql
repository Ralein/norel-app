/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_uid_key" ON "Profile"("uid");
