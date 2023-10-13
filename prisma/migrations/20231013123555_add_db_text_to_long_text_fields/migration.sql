-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_category_id_fkey`;

-- AlterTable
ALTER TABLE `accounts` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL,
    MODIFY `id_token` TEXT NULL;

-- AlterTable
ALTER TABLE `reviewed_books` MODIFY `review` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `_BookToCategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BookToCategory_AB_unique`(`A`, `B`),
    INDEX `_BookToCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BookToCategory` ADD CONSTRAINT `_BookToCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToCategory` ADD CONSTRAINT `_BookToCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
