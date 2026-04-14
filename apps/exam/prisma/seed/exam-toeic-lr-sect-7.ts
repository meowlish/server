import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma } from '@prisma-client/exam';

export class ToeicLrExamSect7Seeder {
	constructor(private readonly tagNamesToIdInputs: (names: string[]) => { tagId: string }[]) {}

	seed(): Prisma.SectionCreateWithoutExamInput[] {
		return [
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
		];
	}
}
