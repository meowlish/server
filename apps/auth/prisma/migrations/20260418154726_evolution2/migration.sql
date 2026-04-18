/*
  Warnings:

  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[identity_id,login_type]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_identity_id_fkey";

-- AlterTable
ALTER TABLE "identities" ADD COLUMN     "avatar_file_id" TEXT,
ADD COLUMN     "bio" VARCHAR(500),
ADD COLUMN     "full_name" VARCHAR(255);

-- DropTable
DROP TABLE "profiles";

-- CreateTable
CREATE TABLE "deleted_files" (
    "file_id" TEXT NOT NULL,

    CONSTRAINT "deleted_files_pkey" PRIMARY KEY ("file_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_identity_id_login_type_key" ON "credentials"("identity_id", "login_type");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "identities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
