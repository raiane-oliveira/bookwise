-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reviewed_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "category" TEXT,
    "image_url" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "reviewed_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reviewed_books" ("author", "category", "created_at", "id", "name", "review", "stars", "user_id") SELECT "author", "category", "created_at", "id", "name", "review", "stars", "user_id" FROM "reviewed_books";
DROP TABLE "reviewed_books";
ALTER TABLE "new_reviewed_books" RENAME TO "reviewed_books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
