import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma } from '@prisma-client/exam';

export class IeltsLExamSect12Seeder {
	constructor(private readonly tagNamesToIdInputs: (names: string[]) => { tagId: string }[]) {}

	seed(): Prisma.SectionCreateWithoutExamInput[] {
		return [
			{
				id: 's21',
				order: 1,
				contentType: SectionType.Question,
				questions: {
					create: [
						{
							order: 1,
							type: QuestionType.FillAnyInTheBlank,
							choices: { create: [{ isCorrect: true, key: 'TEST' }] },
						},
						{
							order: 2,
							type: QuestionType.FillAnyInTheBlank,
						},
						{
							order: 3,
							type: QuestionType.FillAnyInTheBlank,
						},
						{
							order: 4,
							type: QuestionType.FillAnyInTheBlank,
						},
						{
							order: 5,
							type: QuestionType.FillAnyInTheBlank,
						},
						{
							order: 6,
							type: QuestionType.FillAnyInTheBlank,
						},
						{
							order: 7,
							type: QuestionType.FillAnyInTheBlank,
						},
						{
							order: 8,
							type: QuestionType.FillAnyInTheBlank,
						},
						{
							order: 9,
							type: QuestionType.FillAnyInTheBlank,
						},
						{
							order: 10,
							type: QuestionType.FillAnyInTheBlank,
						},
					],
				},
			},
			{
				id: 's22',
				order: 2,
				contentType: SectionType.Section,
				childSections: {
					create: [
						{
							id: 's221',
							examId: '2',
							order: 1,
							contentType: SectionType.Question,
							questions: {
								create: [
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
								],
							},
						},
						{
							id: 's222',
							examId: '2',
							order: 2,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 15,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 16,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 17,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 18,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 19,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 20,
										type: QuestionType.FillAnyInTheBlank,
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
