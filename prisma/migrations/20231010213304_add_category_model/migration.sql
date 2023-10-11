/*
  Warnings:

  - You are about to drop the column `category` on the `books` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "book_id" TEXT NOT NULL,
    CONSTRAINT "Category_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image_url" TEXT,
    "year" INTEGER,
    "rating" INTEGER
);
INSERT INTO "new_books" ("author", "id", "image_url", "name", "rating", "year") SELECT "author", "id", "image_url", "name", "rating", "year" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
