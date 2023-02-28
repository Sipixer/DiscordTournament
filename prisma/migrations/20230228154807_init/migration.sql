-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DiscordID" TEXT NOT NULL,
    "SR" INTEGER NOT NULL,
    "Language" TEXT NOT NULL DEFAULT 'fr',
    "Admin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Player" ("DiscordID", "Language", "SR", "id") SELECT "DiscordID", "Language", "SR", "id" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_DiscordID_key" ON "Player"("DiscordID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
