-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHasColor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStoreGirl" BOOLEAN NOT NULL DEFAULT false;
