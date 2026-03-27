-- AlterTable
ALTER TABLE "identities" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "avatar_file_id" TEXT,
ADD COLUMN     "bio" VARCHAR(500),
ADD COLUMN     "display_name" VARCHAR(255);
