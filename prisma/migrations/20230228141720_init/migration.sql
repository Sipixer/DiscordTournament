/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DiscordID" TEXT NOT NULL,
    "Rank" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Logo" TEXT
);

-- CreateTable
CREATE TABLE "Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PlayerID" INTEGER NOT NULL,
    "TeamID" INTEGER NOT NULL,
    "Role" TEXT NOT NULL,
    CONSTRAINT "Member_PlayerID_fkey" FOREIGN KEY ("PlayerID") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Member_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_DiscordID_key" ON "Player"("DiscordID");

-- CreateIndex
CREATE UNIQUE INDEX "Team_Name_key" ON "Team"("Name");
