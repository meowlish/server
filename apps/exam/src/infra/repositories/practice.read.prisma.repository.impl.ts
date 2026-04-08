import { AttemptHistorySummary } from '../../domain/read-models/attempt-history-summary.read-model';
import {
	DetailedAttemptReviewData,
	SectionReviewData,
} from '../../domain/read-models/attempt-review.read-model';
import {
	AttemptSavedData,
	AttemptSectionData,
} from '../../domain/read-models/attempt-save-data.read-model';
import { DetailedExamInfo } from '../../domain/read-models/detailed-exam.read-model';
import { DetailedQuestionInfo } from '../../domain/read-models/detailed-question.read-model';
import { ExamStatistics } from '../../domain/read-models/exam-statistics.read-model';
import { MinimalAttemptInfo } from '../../domain/read-models/minimal-attempt.read-model';
import { MinimalExamInfo } from '../../domain/read-models/minimal-exam.read-model';
import { UserStats } from '../../domain/read-models/user-stats.read-model';
import { IPracticeReadRepository } from '../../domain/repositories/practice.read.repository';
import { QuestionType, questionTypesThatShowChoices } from '../../enums/question-type.enum';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma-client/exam';
import { SortDirection } from '@server/typing';
import { parseEnum } from '@server/utils';

@Injectable()
export class PracticeReadPrismaRepositoryImpl implements IPracticeReadRepository {
	constructor(private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>) {}

	async getUserStats(uid: string): Promise<UserStats> {
		const [baseStats] = await this.txHost.tx.$queryRaw<
			{
				attemptCounts: number;
				averageScoreInPercentage: number;
			}[]
		>(
			Prisma.sql`
      SELECT
        COUNT(*)::int AS "attemptCounts",
        AVG(
          CASE
            WHEN total_points > 0
            THEN (score::float / total_points) * 100
          END
        ) AS "averageScoreInPercentage"
      FROM attempts
      WHERE attempted_by = ${uid}
      AND ended_at IS NOT NULL
    `,
		);

		const tagInfos = await this.txHost.tx.$queryRaw<{ name: string; correctPercentage: number }[]>(
			Prisma.sql`
      SELECT
        t.name,
        AVG(
          CASE
            WHEN ar.is_correct = TRUE THEN 1
            ELSE 0
          END
        ) * 100 AS "correctPercentage"
      FROM attempt_responses ar
      JOIN questions q
        ON q.id = ar.question_id
      JOIN question_tags qt
        ON qt.question_id = q.id
      JOIN tags t
        ON t.id = qt.tag_id
      JOIN attempts a
        ON a.id = ar.attempt_id
      WHERE a.attempted_by = ${uid}
      GROUP BY t.name
    `,
		);

		return {
			attemptCounts: baseStats?.attemptCounts ?? 0,
			averageScoreInPercentage: baseStats?.averageScoreInPercentage ?? 0,
			tagInfos: tagInfos,
		};
	}

	async getUsersAttemptSummary(
		uid: string,
		range?: { from: Date; to: Date },
	): Promise<AttemptHistorySummary> {
		const now = new Date();
		const defaultFrom = new Date(now.getFullYear(), 0, 1); // Jan 1st
		const defaultTo = now;

		const from = range?.from ?? defaultFrom;
		const to = range?.to ?? defaultTo;

		const rows = await this.txHost.tx.$queryRaw<{ day: bigint; count: number }[]>`
      SELECT
        EXTRACT(EPOCH FROM DATE_TRUNC('day', ended_at))::bigint AS day,
        COUNT(*)::int AS count
      FROM attempts
      WHERE attempted_by = ${uid}
        AND ended_at IS NOT NULL
        AND ended_at >= ${from}
        AND ended_at <= ${to}
      GROUP BY day
      ORDER BY day
    `;

		const summary: AttemptHistorySummary = {};
		for (const row of rows) {
			summary[Number(row.day)] = row.count;
		}

		return summary;
	}

	async getUsersAttemptHistory(uid: string, examId?: string): Promise<MinimalAttemptInfo[]> {
		const foundHistory = await this.txHost.tx.attempt.findMany({
			where: { attemptedBy: uid, ...(examId ? { examId: examId } : {}) },
			select: {
				id: true,
				startedAt: true,
				endedAt: true,
				durationLimit: true,
				score: true,
				totalPoints: true,
				isStrict: true,
			},
			orderBy: { endedAt: 'desc' },
		});

		return foundHistory.map(a => ({
			...a,
			endedAt: a.endedAt ?? undefined,
			score: a.score ?? undefined,
			totalPoints: a.totalPoints ?? undefined,
		}));
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

	async getExamStats(examId: string): Promise<ExamStatistics> {
		const [stats] = await this.txHost.tx.$queryRaw<
			{
				averageDuration: number;
				averageScoreInPercentage: number;
			}[]
		>(
			Prisma.sql`
      SELECT
        AVG(
          EXTRACT(EPOCH FROM (ended_at - started_at))
        ) AS "averageDuration", -- in seconds

        AVG(
          CASE
            WHEN total_points > 0
            THEN score::float / total_points * 100
          END
        ) AS "averageScoreInPercentage"

      FROM attempts
      WHERE exam_id = ${examId}
      AND ended_at IS NOT NULL
    `,
		);

		const questions = await this.txHost.tx.$queryRaw<
			{
				id: string;
				correctCount: number;
				totalCount: number;
				tags: string[];
			}[]
		>(
			Prisma.sql`
        SELECT
          q.id,

          COUNT(DISTINCT ar.id)
            FILTER (WHERE ar.is_correct = TRUE)::int
            AS "correctCount",

          COUNT(DISTINCT ar.id)
            FILTER (WHERE ar.answers IS NOT NULL AND cardinality(ar.answers) > 0)::int
            AS "totalCount",

          COALESCE(
            ARRAY_AGG(DISTINCT tag_names.name)
              FILTER (WHERE tag_names.name IS NOT NULL),
            '{}'
          ) AS tags

        FROM questions q

        LEFT JOIN attempt_responses ar
          ON ar.question_id = q.id

        JOIN sections s
          ON s.id = q.section_id

        LEFT JOIN question_tags qt
          ON qt.question_id = q.id

        LEFT JOIN tags tag_names
          ON tag_names.id = qt.tag_id

        WHERE s.exam_id = ${examId}

        GROUP BY q.id
      `,
		);

		return {
			averageDuration: stats?.averageDuration ?? 0,
			averageScoreInPercentage: stats?.averageScoreInPercentage ?? 0,
			questions: questions,
		};
	}

	async getAttemptSavedData(attemptId: string): Promise<AttemptSavedData> {
		const attemptData = await this.txHost.tx.attempt.findUnique({
			where: { id: attemptId, endedAt: null },
			select: {
				examId: true,
				startedAt: true,
				durationLimit: true,
				attemptResponses: {
					select: { questionId: true, answers: true, note: true, isFlagged: true },
				},
			},
		});

		if (!attemptData) throw new NotFoundException(`Attempt ${attemptId} not found`);

		const sections = await this.txHost.tx.attemptSection.findMany({
			where: { attemptId: attemptId },
			select: {
				section: {
					select: {
						descendants: {
							select: {
								descendant: {
									select: {
										id: true,
										parentId: true,
										name: true,
										directive: true,
										order: true,
										contentType: true,
										sectionFiles: { select: { fileId: true } },
										questions: {
											select: {
												id: true,
												content: true,
												type: true,
												order: true,
												questionFiles: { select: { fileId: true }, orderBy: { updatedAt: 'asc' } },
												choices: { select: { key: true, content: true } },
											},
											orderBy: { order: 'asc' },
										},
									},
								},
							},
						},
					},
				},
			},
		});

		const flattenedSections =
			sections.length === 0 ?
				await this.txHost.tx.section.findMany({
					where: { examId: attemptData.examId },
					select: {
						id: true,
						parentId: true,
						name: true,
						directive: true,
						order: true,
						contentType: true,
						sectionFiles: { select: { fileId: true } },
						questions: {
							select: {
								id: true,
								content: true,
								type: true,
								order: true,
								questionFiles: { select: { fileId: true }, orderBy: { updatedAt: 'asc' } },
								choices: { select: { key: true, content: true } },
							},
							orderBy: { order: 'asc' },
						},
					},
				})
			:	sections.map(s => s.section.descendants.map(d => d.descendant)).flat();

		const castedFlattenedSections: (AttemptSectionData & { parentId: string | null })[] =
			flattenedSections.map(s => ({
				id: s.id,
				parentId: s.parentId,
				name: s.name ?? undefined,
				directive: s.directive,
				order: s.order,
				fileUrls: s.sectionFiles.map(f => f.fileId),
				type: s.contentType,
				sections: [],
				questions: s.questions.map(q => ({
					id: q.id,
					order: q.order,
					content: q.content,
					type: q.type,
					fileUrls: q.questionFiles.map(f => f.fileId),
					choices:
						questionTypesThatShowChoices.includes(parseEnum(QuestionType, q.type)) ?
							q.choices.map(c => ({ key: c.key, content: c.content ?? undefined }))
						:	[],
				})),
			}));
		const sectionsMap = new Map(castedFlattenedSections.map(s => [s.id, s]));
		const treeSections = castedFlattenedSections
			.filter(s => {
				if (s.parentId === null) return true;
				const section = sectionsMap.get(s.parentId);
				if (!section) throw new Error('Problem when building section trees');
				section.sections.push(s);
				section.sections.sort((s1, s2) => s1.order - s2.order);
				return false;
			})
			.sort((s1, s2) => s1.order - s2.order);

		return {
			startedAt: attemptData.startedAt,
			durationLimit: attemptData.durationLimit,
			responses: attemptData.attemptResponses.map(r => ({
				questionId: r.questionId,
				note: r.note ?? undefined,
				isFlagged: r.isFlagged,
				answers: r.answers,
			})),
			sections: treeSections,
		};
	}

	async getAttemptReview(attemptId: string): Promise<DetailedAttemptReviewData> {
		const attemptData = await this.txHost.tx.attempt.findUnique({
			where: { id: attemptId, endedAt: { not: null } },
			select: {
				examId: true,
				startedAt: true,
				endedAt: true,
				durationLimit: true,
				attemptResponses: {
					select: {
						questionId: true,
						answers: true,
						note: true,
						isFlagged: true,
						scorerDatas: { select: { comment: true } },
						isCorrect: true,
					},
				},
				totalPoints: true,
			},
		});

		if (!attemptData) throw new NotFoundException(`Attempt ${attemptId} not found`);

		const sections = await this.txHost.tx.attemptSection.findMany({
			where: { attemptId: attemptId },
			select: {
				section: {
					select: {
						descendants: {
							select: {
								descendant: {
									select: {
										id: true,
										parentId: true,
										name: true,
										directive: true,
										order: true,
										contentType: true,
										sectionFiles: { select: { fileId: true } },
										questions: {
											select: {
												id: true,
												content: true,
												type: true,
												order: true,
												questionFiles: { select: { fileId: true }, orderBy: { updatedAt: 'asc' } },
												choices: { select: { key: true, content: true, isCorrect: true } },
												questionTags: { select: { tag: { select: { name: true } } } },
												points: true,
											},
											orderBy: { order: 'asc' },
										},
									},
								},
							},
						},
					},
				},
			},
		});

		const flattenedSections =
			sections.length === 0 ?
				await this.txHost.tx.section.findMany({
					where: { examId: attemptData.examId },
					select: {
						id: true,
						parentId: true,
						name: true,
						directive: true,
						order: true,
						contentType: true,
						sectionFiles: { select: { fileId: true } },
						questions: {
							select: {
								id: true,
								content: true,
								type: true,
								order: true,
								questionFiles: { select: { fileId: true }, orderBy: { updatedAt: 'asc' } },
								choices: { select: { key: true, content: true, isCorrect: true } },
								questionTags: { select: { tag: { select: { name: true } } } },
								points: true,
							},
							orderBy: { order: 'asc' },
						},
					},
				})
			:	sections.map(s => s.section.descendants.map(d => d.descendant)).flat();

		const castedFlattenedSections: (SectionReviewData & { parentId: string | null })[] =
			flattenedSections.map(s => ({
				id: s.id,
				parentId: s.parentId,
				name: s.name ?? undefined,
				directive: s.directive,
				order: s.order,
				fileUrls: s.sectionFiles.map(f => f.fileId),
				type: s.contentType,
				sections: [],
				questions: s.questions.map(q => ({
					id: q.id,
					order: q.order,
					content: q.content,
					type: q.type,
					fileUrls: q.questionFiles.map(f => f.fileId),
					points: q.points,
					choices:
						questionTypesThatShowChoices.includes(parseEnum(QuestionType, q.type)) ?
							q.choices.map(c => ({
								key: c.key,
								content: c.content ?? undefined,
								isCorrect: c.isCorrect,
							}))
						:	[],
					tags: q.questionTags.map(t => t.tag.name),
				})),
			}));
		const sectionsMap = new Map(castedFlattenedSections.map(s => [s.id, s]));
		const treeSections = castedFlattenedSections
			.filter(s => {
				if (s.parentId === null) return true;
				const section = sectionsMap.get(s.parentId);
				if (!section) throw new Error('Problem when building section trees');
				section.sections.push(s);
				section.sections.sort((s1, s2) => s1.order - s2.order);
				return false;
			})
			.sort((s1, s2) => s1.order - s2.order);

		return {
			startedAt: attemptData.startedAt,
			endedAt: attemptData.endedAt as Date,
			durationLimit: attemptData.durationLimit,
			totalPoints: attemptData.totalPoints ?? undefined,
			responses: attemptData.attemptResponses.map(r => ({
				questionId: r.questionId,
				note: r.note ?? undefined,
				isFlagged: r.isFlagged,
				answers: r.answers,
				isCorrect: r.isCorrect ?? undefined,
				additionalData: r.scorerDatas.length ? (r.scorerDatas[0].comment as object) : undefined,
			})),
			sections: treeSections,
		};
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
