import { ExamStatus } from '../../src/enums/exam-status.enum';
import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma, PrismaClient } from '@prisma-client/exam';

// i'm seeding it

// order in this seeder is assigned value incrementing from 1, however in production, order is assigned by the server algo and is not as simple as in the seeder
// just keep that in mind

export async function seedExams(prisma: PrismaClient) {
	const tags = await prisma.tag.findMany();
	const tagsMap = new Map(tags.map(tag => [tag.name.toLocaleLowerCase(), tag.id]));

	const tagNamesToIdInputs = (names: string[]): { tagId: string }[] => {
		return names
			.map(n => {
				n = n.toLocaleLowerCase();
				if (!tagsMap.has(n)) console.warn(`Database does not have tag ${n}`);
				return { tagId: tagsMap.get(n) };
			})
			.filter((inp): inp is { tagId: string } => !!inp.tagId);
	};

	// 1
	const toeicDefaultLRExam: Prisma.ExamCreateInput = {
		id: '1',
		createdBy: 'admin-id',
		title: 'TOEIC LR 1',
		duration: 2 * 60 * 60,
		status: ExamStatus.Approved,
		examTags: {
			createMany: {
				data: tagNamesToIdInputs(['TOEIC Listening', 'TOEIC Reading']),
				skipDuplicates: true,
			},
		},
		sections: {
			create: [
				{
					id: 's11',
					order: 1,
					contentType: SectionType.Question,
					questions: {
						create: [
							{
								order: 1,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 2,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 3,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 4,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 5,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 6,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
						],
					},
				},
				{
					id: 's12',
					order: 2,
					contentType: SectionType.Question,
					questions: {
						create: [
							{
								order: 7,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 8,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 9,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 10,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 11,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 12,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 13,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 14,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 15,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 16,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 17,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 18,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 19,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 20,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 21,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 22,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 23,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 24,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 25,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 26,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 27,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 28,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 29,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 30,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
							{
								order: 31,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
									],
								},
							},
						],
					},
				},
				{
					id: 's13',
					order: 3,
					contentType: SectionType.Section,
					childSections: {
						create: [
							{
								id: 's131',
								examId: '1',
								order: 1,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 32,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 33,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 34,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's132',
								examId: '1',
								order: 2,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 35,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 36,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 37,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's133',
								examId: '1',
								order: 3,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 38,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 39,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 40,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's134',
								examId: '1',
								order: 4,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 41,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 42,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 43,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's135',
								examId: '1',
								order: 5,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 44,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 45,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 46,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's136',
								examId: '1',
								order: 6,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 47,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 48,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 49,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's137',
								examId: '1',
								order: 7,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 50,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 51,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 52,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's138',
								examId: '1',
								order: 8,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 53,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 54,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 55,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's139',
								examId: '1',
								order: 9,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 56,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 57,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 58,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's13_10',
								examId: '1',
								order: 10,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 59,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 60,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 61,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's13_11',
								examId: '1',
								order: 11,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 62,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 63,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 64,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's13_12',
								examId: '1',
								order: 12,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 65,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 66,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 67,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's13_13',
								examId: '1',
								order: 13,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 68,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 69,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 70,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
						],
					},
				},
				{
					id: 's14',
					order: 4,
					contentType: SectionType.Section,
					childSections: {
						create: [
							{
								id: 's141',
								examId: '1',
								order: 1,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 71,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 72,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 73,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's142',
								examId: '1',
								order: 2,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 74,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 75,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 76,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's143',
								examId: '1',
								order: 3,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 77,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 78,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 79,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's144',
								examId: '1',
								order: 4,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 80,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 81,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 82,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's145',
								examId: '1',
								order: 5,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 83,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 84,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 85,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's146',
								examId: '1',
								order: 6,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 86,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 87,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 88,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's147',
								examId: '1',
								order: 7,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 89,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 90,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 91,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's148',
								examId: '1',
								order: 8,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 92,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 93,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 94,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's149',
								examId: '1',
								order: 9,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 95,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 96,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 97,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's14_10',
								examId: '1',
								order: 10,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 98,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 99,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 100,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
						],
					},
				},
				{
					id: 's15',
					order: 5,
					contentType: SectionType.Question,
					questions: {
						create: [
							{
								order: 101,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 102,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 103,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 104,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 105,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 106,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 107,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 108,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 109,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 110,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 111,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 112,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 113,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 114,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 115,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 116,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 117,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 118,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 119,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 120,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 121,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 122,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 123,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 124,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 125,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 126,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 127,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 128,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 129,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
							{
								order: 130,
								type: QuestionType.MultipleChoiceSingle,
								choices: {
									create: [
										{ key: 'A', isCorrect: false },
										{ key: 'B', isCorrect: false },
										{ key: 'C', isCorrect: false },
										{ key: 'D', isCorrect: false },
									],
								},
							},
						],
					},
				},
				{
					id: 's16',
					order: 6,
					contentType: SectionType.Section,
					childSections: {
						create: [
							{
								id: 's161',
								examId: '1',
								order: 1,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 131,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 132,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 133,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 134,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's162',
								examId: '1',
								order: 2,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 135,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 136,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 137,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 138,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's163',
								examId: '1',
								order: 3,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 139,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 140,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 141,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 142,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's164',
								examId: '1',
								order: 4,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 143,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 144,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 145,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 146,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
						],
					},
				},
				{
					id: 's17',
					order: 7,
					contentType: SectionType.Section,
					childSections: {
						create: [
							{
								id: 's171',
								examId: '1',
								order: 1,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 147,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 148,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's172',
								examId: '1',
								order: 2,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 149,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 150,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's173',
								examId: '1',
								order: 3,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 151,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 152,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's174',
								examId: '1',
								order: 4,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 153,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 154,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's175',
								examId: '1',
								order: 5,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 155,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 156,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 157,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's176',
								examId: '1',
								order: 6,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 158,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 159,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 160,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's177',
								examId: '1',
								order: 7,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 161,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 162,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 163,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 164,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's178',
								examId: '1',
								order: 8,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 165,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 166,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 167,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's179',
								examId: '1',
								order: 9,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 168,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 169,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 170,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 171,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's17_10',
								examId: '1',
								order: 10,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 172,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 173,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 174,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 175,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's17_11',
								examId: '1',
								order: 11,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 176,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 177,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 178,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 179,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 180,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's17_12',
								examId: '1',
								order: 12,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 181,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 182,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 183,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 184,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 185,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's17_13',
								examId: '1',
								order: 13,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 186,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 187,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 188,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 189,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 190,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's17_14',
								examId: '1',
								order: 14,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 191,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 192,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 193,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 194,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 195,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
							{
								id: 's17_15',
								examId: '1',
								order: 15,
								contentType: SectionType.Question,
								questions: {
									create: [
										{
											order: 196,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 197,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 198,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 199,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
										{
											order: 200,
											type: QuestionType.MultipleChoiceSingle,
											choices: {
												create: [
													{ key: 'A', isCorrect: false },
													{ key: 'B', isCorrect: false },
													{ key: 'C', isCorrect: false },
													{ key: 'D', isCorrect: false },
												],
											},
										},
									],
								},
							},
						],
					},
				},
			],
		},
	};

	// 2
	const ieltsDefaultLExam: Prisma.ExamCreateInput = {
		createdBy: 'admmin-id',
		title: 'IELTS L 1',
		duration: 40 * 60,
		status: ExamStatus.Approved,
		examTags: {
			createMany: {
				data: tagNamesToIdInputs(['IELTS Listening P1-4', 'IELTS Reading P1-3']),
				skipDuplicates: true,
			},
		},
		sections: { createMany: { data: [], skipDuplicates: true } },
	};

	// 3
	const ieltsDefaultRExam: Prisma.ExamCreateInput = {
		createdBy: 'admmin-id',
		title: 'IELTS R 1',
		duration: 60 * 60,
		status: ExamStatus.Approved,
		examTags: {
			createMany: {
				data: tagNamesToIdInputs(['IELTS Listening P1-4', 'IELTS Reading P1-3']),
				skipDuplicates: true,
			},
		},
		sections: { createMany: { data: [], skipDuplicates: true } },
	};

	// 4
	const toeicDefaultWritingExam: Prisma.ExamCreateInput = {
		createdBy: 'admin-id',
		title: 'TOEIC Writing 1',
		duration: 60 * 60,
		status: ExamStatus.Approved,
		examTags: {
			createMany: { data: tagNamesToIdInputs(['TOEIC', 'Writing']), skipDuplicates: true },
		},
		sections: { createMany: { data: [], skipDuplicates: true } },
	};

	// 5
	const IELTS_DEFAULT_W_ID = 'ielts-writing-default';
	const ieltsDefaultWritingExam: Prisma.ExamCreateInput = {
		createdBy: 'admin-id',
		id: IELTS_DEFAULT_W_ID,
		title: 'IELTS Writing 1',
		duration: 60 * 60,
		status: ExamStatus.Approved,
		examTags: {
			createMany: { data: tagNamesToIdInputs(['IELTS', 'Writing']), skipDuplicates: true },
		},
		sections: { createMany: { data: [], skipDuplicates: true } },
	};

	await prisma.exam.createMany({
		data: [
			toeicDefaultLRExam,
			ieltsDefaultLExam,
			ieltsDefaultRExam,
			toeicDefaultWritingExam,
			ieltsDefaultWritingExam,
		],
		skipDuplicates: true,
	});
}
