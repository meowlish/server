import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma } from '@prisma-client/exam';

export class ToeicLrExamSect34Seeder {
	constructor(private readonly tagNamesToIdInputs: (names: string[]) => { tagId: string }[]) {}

	seed(): Prisma.SectionCreateWithoutExamInput[] {
		return [
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
				sectionTags: { create: this.tagNamesToIdInputs(['TOEIC Listening Part 3']) },
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
				sectionTags: { create: this.tagNamesToIdInputs(['TOEIC Listening Part 4']) },
			},
		];
	}
}
