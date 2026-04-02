import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma } from '@prisma-client/exam';

export class ToeicLrExamSect56Seeder {
	constructor(private readonly tagNamesToIdInputs: (names: string[]) => { tagId: string }[]) {}

	seed(): Prisma.SectionCreateWithoutExamInput[] {
		return [
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
		];
	}
}
