/*
  Warnings:

  - You are about to drop the column `documentId` on the `DigitalSignature` table. All the data in the column will be lost.
  - You are about to drop the column `signedAt` on the `DigitalSignature` table. All the data in the column will be lost.
  - You are about to drop the column `signedDocumentUrl` on the `DigitalSignature` table. All the data in the column will be lost.
  - You are about to drop the column `signerId` on the `DigitalSignature` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[creditApplicationId]` on the table `DigitalSignature` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `DigitalSignature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Company" DROP CONSTRAINT "Company_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CreditApplication" DROP CONSTRAINT "CreditApplication_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DigitalSignature" DROP CONSTRAINT "DigitalSignature_creditApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DigitalSignature" DROP CONSTRAINT "DigitalSignature_documentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DigitalSignature" DROP CONSTRAINT "DigitalSignature_signerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_creditApplicationId_fkey";

-- DropIndex
DROP INDEX "public"."DigitalSignature_creditApplicationId_documentId_key";

-- AlterTable
ALTER TABLE "DigitalSignature" DROP COLUMN "documentId",
DROP COLUMN "signedAt",
DROP COLUMN "signedDocumentUrl",
DROP COLUMN "signerId",
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DigitalSignature_creditApplicationId_key" ON "DigitalSignature"("creditApplicationId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditApplication" ADD CONSTRAINT "CreditApplication_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_creditApplicationId_fkey" FOREIGN KEY ("creditApplicationId") REFERENCES "CreditApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalSignature" ADD CONSTRAINT "DigitalSignature_creditApplicationId_fkey" FOREIGN KEY ("creditApplicationId") REFERENCES "CreditApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
