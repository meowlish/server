-- CreateTable
CREATE TABLE "section_files" (
    "question_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "section_files_pkey" PRIMARY KEY ("question_id","file_id")
);

-- CreateTable
CREATE TABLE "question_files" (
    "question_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "question_files_pkey" PRIMARY KEY ("question_id","file_id")
);

-- CreateTable
CREATE TABLE "deleted_files" (
    "file_id" TEXT NOT NULL,

    CONSTRAINT "deleted_files_pkey" PRIMARY KEY ("file_id")
);

-- CreateTable
CREATE TABLE "goals" (
    "uid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "target" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "exam_tags" (
    "exam_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "exam_tags_pkey" PRIMARY KEY ("exam_id","tag_id")
);

-- CreateTable
CREATE TABLE "section_tags" (
    "section_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "section_tags_pkey" PRIMARY KEY ("section_id","tag_id")
);

-- CreateTable
CREATE TABLE "question_tags" (
    "question_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "question_tags_pkey" PRIMARY KEY ("question_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "section_files" ADD CONSTRAINT "section_files_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_files" ADD CONSTRAINT "question_files_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tags" ADD CONSTRAINT "exam_tags_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tags" ADD CONSTRAINT "exam_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_tags" ADD CONSTRAINT "section_tags_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_tags" ADD CONSTRAINT "section_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_tags" ADD CONSTRAINT "question_tags_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_tags" ADD CONSTRAINT "question_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
