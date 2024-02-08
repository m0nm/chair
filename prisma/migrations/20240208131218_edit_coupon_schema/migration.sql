/*
  Warnings:

  - You are about to drop the column `active` on the `Coupon` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CouponStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "active",
ADD COLUMN     "status" "CouponStatus" NOT NULL DEFAULT 'ACTIVE';
