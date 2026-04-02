import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma } from '@prisma-client/exam';

export class IeltsRExamSect12Seeder {
	constructor(private readonly tagNamesToIdInputs: (names: string[]) => { tagId: string }[]) {}

	seed(): Prisma.SectionCreateWithoutExamInput[] {
		return [
			{
				id: 's31',
				order: 1,
				contentType: SectionType.Section,
				childSections: {
					create: [
						{
							id: 's311',
							examId: '3',
							order: 1,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 1,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 2,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 3,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 4,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 5,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 6,
										type: QuestionType.FillExactInTheBlank,
									},
								],
							},
						},
						{
							id: 's312',
							examId: '3',
							order: 2,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 7,
										type: QuestionType.MultipleChoiceSingle,
										choices: {
											create: [
												{ key: 'T', content: 'TRUE', isCorrect: false },
												{ key: 'F', content: 'FALSE', isCorrect: false },
												{ key: 'NG', content: 'NOT GIVEN', isCorrect: false },
											],
										},
									},
									{
										order: 8,
										type: QuestionType.MultipleChoiceSingle,
										choices: {
											create: [
												{ key: 'T', content: 'TRUE', isCorrect: false },
												{ key: 'F', content: 'FALSE', isCorrect: false },
												{ key: 'NG', content: 'NOT GIVEN', isCorrect: false },
											],
										},
									},
									{
										order: 9,
										type: QuestionType.MultipleChoiceSingle,
										choices: {
											create: [
												{ key: 'T', content: 'TRUE', isCorrect: false },
												{ key: 'F', content: 'FALSE', isCorrect: false },
												{ key: 'NG', content: 'NOT GIVEN', isCorrect: false },
											],
										},
									},
									{
										order: 10,
										type: QuestionType.MultipleChoiceSingle,
										choices: {
											create: [
												{ key: 'T', content: 'TRUE', isCorrect: false },
												{ key: 'F', content: 'FALSE', isCorrect: false },
												{ key: 'NG', content: 'NOT GIVEN', isCorrect: false },
											],
										},
									},
									{
										order: 11,
										type: QuestionType.MultipleChoiceSingle,
										choices: {
											create: [
												{ key: 'T', content: 'TRUE', isCorrect: false },
												{ key: 'F', content: 'FALSE', isCorrect: false },
												{ key: 'NG', content: 'NOT GIVEN', isCorrect: false },
											],
										},
									},
									{
										order: 12,
										type: QuestionType.MultipleChoiceSingle,
										choices: {
											create: [
												{ key: 'T', content: 'TRUE', isCorrect: false },
												{ key: 'F', content: 'FALSE', isCorrect: false },
												{ key: 'NG', content: 'NOT GIVEN', isCorrect: false },
											],
										},
									},
									{
										order: 13,
										type: QuestionType.MultipleChoiceSingle,
										choices: {
											create: [
												{ key: 'T', content: 'TRUE', isCorrect: false },
												{ key: 'F', content: 'FALSE', isCorrect: false },
												{ key: 'NG', content: 'NOT GIVEN', isCorrect: false },
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
				id: 's32',
				order: 2,
				contentType: SectionType.Section,
				childSections: {
					create: [
						{
							id: 's321',
							examId: '3',
							order: 1,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 14,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 15,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 16,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 17,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 18,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 19,
										type: QuestionType.FillExactInTheBlank,
									},
								],
							},
						},
						{
							id: 's322',
							examId: '3',
							order: 2,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 20,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 21,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 22,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 23,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 24,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 25,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 26,
										type: QuestionType.FillExactInTheBlank,
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
