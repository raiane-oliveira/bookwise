/*
  Warnings:

  - You are about to drop the column `category_id` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `books_category_id_fkey` ON `books`;

-- AlterTable
ALTER TABLE `books` DROP COLUMN `category_id`;
