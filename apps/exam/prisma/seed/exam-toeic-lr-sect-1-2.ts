import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma } from '@prisma-client/exam';

export class ToeicLrExamSect12Seeder {
	constructor(private readonly tagNamesToIdInputs: (names: string[]) => { tagId: string }[]) {}

	seed(): Prisma.SectionCreateWithoutExamInput[] {
		return [
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
		];
	}
}
