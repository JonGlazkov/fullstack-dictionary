/*
  Warnings:

  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Word";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "words" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "words_word_key" ON "words"("word");
