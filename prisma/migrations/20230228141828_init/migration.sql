/*
  Warnings:

  - You are about to drop the column `Rank` on the `Player` table. All the data in the column will be lost.
  - Added the required column `SR` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DiscordID" TEXT NOT NULL,
    "SR" INTEGER NOT NULL
);
INSERT INTO "new_Player" ("DiscordID", "id") SELECT "DiscordID", "id" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_DiscordID_key" ON "Player"("DiscordID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
