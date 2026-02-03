/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
