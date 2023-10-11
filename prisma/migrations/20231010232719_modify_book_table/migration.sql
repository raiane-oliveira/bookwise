-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image_url" TEXT,
    "year" INTEGER,
    "rating" INTEGER,
    "pages" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" TEXT,
    CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "category_id", "id", "image_url", "name", "rating", "year") SELECT "author", "category_id", "id", "image_url", "name", "rating", "year" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
