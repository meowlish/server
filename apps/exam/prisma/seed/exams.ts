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
