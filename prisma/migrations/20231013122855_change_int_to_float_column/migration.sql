/*
  Warnings:

  - You are about to alter the column `stars` on the `reviewed_books` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `rating` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reviewed_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "review" TEXT NOT NULL,
    "stars" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    CONSTRAINT "reviewed_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviewed_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reviewed_books" ("book_id", "created_at", "id", "review", "stars", "user_id") SELECT "book_id", "created_at", "id", "review", "stars", "user_id" FROM "reviewed_books";
DROP TABLE "reviewed_books";
ALTER TABLE "new_reviewed_books" RENAME TO "reviewed_books";
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image_url" TEXT,
    "year" INTEGER,
    "rating" REAL NOT NULL DEFAULT 0,
    "pages" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" TEXT,
    CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "category_id", "created_at", "id", "image_url", "name", "pages", "rating", "year") SELECT "author", "category_id", "created_at", "id", "image_url", "name", "pages", coalesce("rating", 0) AS "rating", "year" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
