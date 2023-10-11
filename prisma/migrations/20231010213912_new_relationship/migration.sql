/*
  Warnings:

  - You are about to drop the column `book_id` on the `categories` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image_url" TEXT,
    "year" INTEGER,
    "rating" INTEGER,
    "category_id" TEXT,
    CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "id", "image_url", "name", "rating", "year") SELECT "author", "id", "image_url", "name", "rating", "year" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE TABLE "new_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_categories" ("created_at", "id", "name") SELECT "created_at", "id", "name" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
