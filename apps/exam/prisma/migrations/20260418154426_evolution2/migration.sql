/*
  Warnings:

  - The primary key for the `section_files` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `question_id` on the `section_files` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `question_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_id` to the `section_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `section_files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "section_files" DROP CONSTRAINT "section_files_question_id_fkey";

-- AlterTable
ALTER TABLE "question_files" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "section_files" DROP CONSTRAINT "section_files_pkey",
DROP COLUMN "question_id",
ADD COLUMN     "section_id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "section_files_pkey" PRIMARY KEY ("section_id", "file_id");

-- CreateTable
CREATE TABLE "scorer_data" (
    "response_id" TEXT NOT NULL,
    "comment" JSONB NOT NULL,

    CONSTRAINT "scorer_data_pkey" PRIMARY KEY ("response_id")
);

-- CreateIndex
CREATE INDEX "attempts_ended_at_id_idx" ON "attempts"("ended_at", "id");

-- CreateIndex
CREATE INDEX "attempts_started_at_id_idx" ON "attempts"("started_at", "id");

-- CreateIndex
CREATE INDEX "attempts_exam_id_id_idx" ON "attempts"("exam_id", "id");

-- CreateIndex
CREATE INDEX "attempts_score_id_idx" ON "attempts"("score", "id");

-- CreateIndex
CREATE INDEX "exams_updated_at_id_idx" ON "exams"("updated_at", "id");

-- AddForeignKey
ALTER TABLE "scorer_data" ADD CONSTRAINT "scorer_data_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "attempt_responses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_files" ADD CONSTRAINT "section_files_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
