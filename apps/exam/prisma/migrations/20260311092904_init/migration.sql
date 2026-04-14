-- CreateTable
CREATE TABLE "attempts" (
    "id" TEXT NOT NULL,
    "attempted_by" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "duration_limit" INTEGER NOT NULL,
    "score" INTEGER,
    "total_points" INTEGER,
    "is_strict" BOOLEAN NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempt_sections" (
    "attempt_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "attempt_sections_pkey" PRIMARY KEY ("attempt_id","section_id")
);

-- CreateTable
CREATE TABLE "attempt_responses" (
    "id" TEXT NOT NULL,
    "attempt_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answers" TEXT[],
    "is_correct" BOOLEAN,
    "is_flagged" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,

    CONSTRAINT "attempt_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "name" TEXT,
    "directive" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL,
    "content_type" TEXT NOT NULL DEFAULT 'SECTION',

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_closures" (
    "ancestor_id" TEXT NOT NULL,
    "descendant_id" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,

    CONSTRAINT "section_closures_pkey" PRIMARY KEY ("ancestor_id","descendant_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT 'MCQ',
    "points" INTEGER NOT NULL DEFAULT 1,
    "explanation" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "choices" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "content" TEXT,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_table_lock" (
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tags_table_lock_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lft" INTEGER NOT NULL,
    "rgt" INTEGER NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "attempts_exam_id_attempted_by_ended_at_idx" ON "attempts"("exam_id", "attempted_by", "ended_at");

-- CreateIndex
CREATE INDEX "attempts_attempted_by_idx" ON "attempts"("attempted_by");

-- CreateIndex
CREATE INDEX "attempts_exam_id_idx" ON "attempts"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "attempts_exam_id_attempted_by_order_key" ON "attempts"("exam_id", "attempted_by", "order");

-- CreateIndex
CREATE INDEX "attempt_responses_attempt_id_idx" ON "attempt_responses"("attempt_id");

-- CreateIndex
CREATE INDEX "attempt_responses_question_id_idx" ON "attempt_responses"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "attempt_responses_attempt_id_question_id_key" ON "attempt_responses"("attempt_id", "question_id");

-- CreateIndex
CREATE INDEX "exams_status_idx" ON "exams"("status");

-- CreateIndex
CREATE INDEX "exams_version_idx" ON "exams"("version");

-- CreateIndex
CREATE INDEX "sections_exam_id_idx" ON "sections"("exam_id");

-- CreateIndex
CREATE INDEX "section_closures_ancestor_id_idx" ON "section_closures"("ancestor_id");

-- CreateIndex
CREATE INDEX "section_closures_descendant_id_idx" ON "section_closures"("descendant_id");

-- CreateIndex
CREATE INDEX "questions_section_id_idx" ON "questions"("section_id");

-- CreateIndex
CREATE INDEX "choices_question_id_idx" ON "choices"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_lft_rgt_idx" ON "tags"("lft", "rgt");

-- CreateIndex
CREATE INDEX "tags_name_idx" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_sections" ADD CONSTRAINT "attempt_sections_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_sections" ADD CONSTRAINT "attempt_sections_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_responses" ADD CONSTRAINT "attempt_responses_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_responses" ADD CONSTRAINT "attempt_responses_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_closures" ADD CONSTRAINT "section_closures_ancestor_id_fkey" FOREIGN KEY ("ancestor_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_closures" ADD CONSTRAINT "section_closures_descendant_id_fkey" FOREIGN KEY ("descendant_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
