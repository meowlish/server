import { AttemptHistorySummary } from '../../domain/read-models/attempt-history-summary.read-model';
import { DetailedAttemptReviewData } from '../../domain/read-models/attempt-review,.read-model';
import { AttemptSavedData } from '../../domain/read-models/attempt-save-data.read-model';
import { DetailedExamInfo } from '../../domain/read-models/detailed-exam.read-model';
import { DetailedQuestionInfo } from '../../domain/read-models/detailed-question.read-model';
import { ExamStatistics } from '../../domain/read-models/exam-statistics.read-model';
import { MinimalAttemptInfo } from '../../domain/read-models/minimal-attempt.read-model';
import { MinimalExamInfo } from '../../domain/read-models/minimal-exam.read-model';
import { UserStats } from '../../domain/read-models/user-stats.read-model';
import { IPracticeReadRepository } from '../../domain/repositories/practice.read.repository';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma-client/exam';
import { SortDirection } from '@server/typing';

@Injectable()
export class PracticeReadPrismaRepositoryImpl implements IPracticeReadRepository {
	constructor(private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>) {}

	getUserStats(uid: string): Promise<UserStats> {
		return {} as unknown as Promise<UserStats>;
	}

	getUsersAttemptSummary(
		uid: string,
		range?: { from: Date; to: Date },
	): Promise<AttemptHistorySummary> {
		return {} as unknown as Promise<AttemptHistorySummary>;
	}

	getUsersAttemptHistory(uid: string, examId?: string): Promise<MinimalAttemptInfo[]> {
		return [] as unknown as Promise<MinimalAttemptInfo[]>;
	}

	async findExam(options?: {
		filter?: { name?: string; tags?: string[] };
		sortBy?: { key: 'attemptsCount' | 'updatedAt'; direction: SortDirection };
	}): Promise<MinimalExamInfo[]> {
		// sort by attemptsCount or by update time
		// fallback to sort by ID
		const sortSql =
			options?.sortBy ?
				options.sortBy.key === 'attemptsCount' ?
					Prisma.sql`
          "attemptsCount" ${Prisma.raw(options.sortBy.direction)},
          e.id ASC
        `
				:	Prisma.sql`
          e.updated_at ${Prisma.raw(options.sortBy.direction)},
          e.id ASC
        `
			:	Prisma.sql`e.id ASC`;

		// filter by name
		const nameFilterSql =
			options?.filter?.name ?
				Prisma.sql`
        e.title ILIKE '%' || ${options.filter.name} || '%'
      `
				// fallback take all
			:	Prisma.sql`TRUE`;

		// filter by tag (any tags in exam, sections or questions)
		const tagFilterSql =
			options?.filter?.tags?.length ?
				Prisma.sql`

        EXISTS (

          SELECT 1
          FROM tags filter_t

          WHERE filter_t.name IN (
            ${Prisma.join(options.filter.tags)}
          )

          AND EXISTS (

            SELECT 1
            FROM tags t2

            LEFT JOIN exam_tags et2
              ON et2.tag_id = t2.id

            LEFT JOIN section_tags st2
              ON st2.tag_id = t2.id

            LEFT JOIN sections s
              ON s.id = st2.section_id

            LEFT JOIN question_tags qt2
              ON qt2.tag_id = t2.id

            LEFT JOIN questions q
              ON q.id = qt2.question_id

            LEFT JOIN sections qs
              ON qs.id = q.section_id

            WHERE

              (
                et2.exam_id = e.id
                OR s.exam_id = e.id
                OR qs.exam_id = e.id
              )

              -- the filter must be descendants of the tags inside exam (sections, questions and whatnot)
              AND filter_t.lft BETWEEN t2.lft AND t2.rgt

          )

        )

      `
				// fallback take all
			:	Prisma.sql`TRUE`;

		const rows = await this.txHost.tx.$queryRaw<
			{
				id: string;
				name: string;
				description: string | null;
				attemptsCount: number;
				duration: number;
				tags: string[];
			}[]
		>(
			Prisma.sql`

      SELECT
        e.id,
        e.title AS name,
        e.description,
        e.duration,
        -- cast type to int, count distinct because join causes duplicate
        COUNT(DISTINCT a.id)::int AS "attemptsCount",
        -- return tags from exam directly
        COALESCE(
          ARRAY_AGG(DISTINCT t.name)
            FILTER (WHERE t.name IS NOT NULL),
          '{}'
        ) AS tags

      FROM exams e

      LEFT JOIN attempts a
        ON a.exam_id = e.id

      LEFT JOIN exam_tags et
        ON et.exam_id = e.id

      LEFT JOIN tags t
        ON t.id = et.tag_id

      WHERE
        ${nameFilterSql}
        AND ${tagFilterSql}

      GROUP BY e.id

      ORDER BY ${sortSql}

    `,
		);

		return rows.map(r => ({ ...r, description: r.description ?? undefined }));
	}

	async getExamDetail(examId: string): Promise<DetailedExamInfo> {
		const [exam] = await this.txHost.tx.$queryRaw<
			{
				id: string;
				name: string;
				description: string | null;
				duration: number;
				attemptsCount: number;
				tags: string[];
			}[]
		>(
			Prisma.sql`
      SELECT
        e.id,
        e.title AS name,
        e.description,
        e.duration,
        COUNT(DISTINCT a.id)::int AS "attemptsCount",
        COALESCE(
          ARRAY_AGG(DISTINCT t.name)
            FILTER (WHERE t.name IS NOT NULL),
          '{}'
        ) AS tags

      FROM exams e

      LEFT JOIN attempts a
        ON a.exam_id = e.id

      LEFT JOIN exam_tags et
        ON et.exam_id = e.id

      LEFT JOIN tags t
        ON t.id = et.tag_id

      WHERE e.id = ${examId}

      GROUP BY e.id
    `,
		);

		if (!exam) {
			throw new NotFoundException(`Exam ${examId} not found`);
		}

		const sections = await this.txHost.tx.$queryRaw<
			{
				id: string;
				name: string | null;
				questionsCount: number;
				tags: string[];
			}[]
		>(
			Prisma.sql`
      SELECT
        s.id,
        s.name,

        COUNT(DISTINCT q.id)::int AS "questionsCount",

        COALESCE(
          ARRAY_AGG(DISTINCT tag_names.name)
            FILTER (WHERE tag_names.name IS NOT NULL),
          '{}'
        ) AS tags

      FROM sections s

      /* get descendants */
      LEFT JOIN section_closures sc
        ON sc.ancestor_id = s.id

      /* questions inside descendants */
      LEFT JOIN questions q
        ON q.section_id = sc.descendant_id

      /* section tags from descendants */
      LEFT JOIN section_tags st
        ON st.section_id = sc.descendant_id

      /* question tags */
      LEFT JOIN question_tags qt
        ON qt.question_id = q.id

      /* unify tag sources */
      LEFT JOIN tags tag_names
        ON tag_names.id = st.tag_id
        OR tag_names.id = qt.tag_id

      WHERE s.exam_id = ${examId}
        AND s.parent_id IS NULL

      GROUP BY s.id

      ORDER BY s.order ASC
      `,
		);

		return {
			id: exam.id,
			name: exam.name,
			description: exam.description ?? undefined,
			duration: exam.duration,
			attemptsCount: exam.attemptsCount,
			tags: exam.tags,
			sections: sections.map(s => ({ ...s, name: s.name ?? undefined })),
		};
	}

	getExamStats(examId: string): Promise<ExamStatistics> {
		return {} as unknown as Promise<ExamStatistics>;
	}

	getAttemptSavedData(attemptId: string): Promise<AttemptSavedData> {
		return {} as unknown as Promise<AttemptSavedData>;
	}

	getAttemptReview(attemptId: string): Promise<DetailedAttemptReviewData> {
		return {} as unknown as Promise<DetailedAttemptReviewData>;
	}

	async getDetailedQuestionInfo(questionId: string): Promise<DetailedQuestionInfo> {
		const foundQuestion = await this.txHost.tx.question.findUnique({
			where: { id: questionId },
			select: {
				id: true,
				content: true,
				type: true,
				explanation: true,
				points: true,
				questionFiles: { select: { fileId: true }, orderBy: { updatedAt: 'asc', fileId: 'asc' } },
				section: {
					select: {
						ancestors: {
							select: {
								ancestor: {
									select: { directive: true, sectionFiles: { select: { fileId: true } } },
								},
							},
							orderBy: { depth: 'desc' },
						},
					},
				},
			},
		});

		if (!foundQuestion) throw new NotFoundException(`Question ${questionId} not found`);

		return {
			id: foundQuestion.id,
			content: foundQuestion.content,
			explanation: foundQuestion.explanation,
			points: foundQuestion.points,
			type: foundQuestion.type,
			fileUrls: foundQuestion.questionFiles.map(f => f.fileId),
			sectionContext: foundQuestion.section.ancestors.map(a => ({
				content: a.ancestor.directive ?? undefined,
				fileUrls: a.ancestor.sectionFiles.map(f => f.fileId),
			})),
		};
	}
}
