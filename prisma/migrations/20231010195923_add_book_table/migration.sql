/*
  Warnings:

  - You are about to drop the column `author` on the `reviewed_books` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `reviewed_books` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `reviewed_books` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `reviewed_books` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `reviewed_books` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image_url" TEXT,
    "category" TEXT,
    "year" INTEGER
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reviewed_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "review" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    CONSTRAINT "reviewed_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviewed_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reviewed_books" ("created_at", "id", "review", "stars", "user_id") SELECT "created_at", "id", "review", "stars", "user_id" FROM "reviewed_books";
DROP TABLE "reviewed_books";
ALTER TABLE "new_reviewed_books" RENAME TO "reviewed_books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
