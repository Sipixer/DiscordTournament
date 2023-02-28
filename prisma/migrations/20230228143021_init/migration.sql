/*
  Warnings:

  - A unique constraint covering the columns `[RoleID]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN "RoleID" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DiscordID" TEXT NOT NULL,
    "SR" INTEGER NOT NULL,
    "Language" TEXT NOT NULL DEFAULT 'fr'
);
INSERT INTO "new_Player" ("DiscordID", "SR", "id") SELECT "DiscordID", "SR", "id" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_DiscordID_key" ON "Player"("DiscordID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Team_RoleID_key" ON "Team"("RoleID");
