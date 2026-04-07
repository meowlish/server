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
				directive: 'Directive goes here test 123',
				questions: {
					create: [
						{
							order: 1,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: true },
									{ key: 'D', isCorrect: false },
								],
							},
							questionTags: { create: this.tagNamesToIdInputs(['Photo Human Object']) },
							questionFiles: { create: [{ fileId: 'SYSTEM_1.jpg' }, { fileId: 'SYSTEM_q1.mp3' }] },
						},
						{
							order: 2,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: true },
									{ key: 'C', isCorrect: false },
									{ key: 'D', isCorrect: false },
								],
							},
							questionTags: { create: this.tagNamesToIdInputs(['Photo Human Object']) },
							questionFiles: { create: [{ fileId: 'SYSTEM_2.jpg' }, { fileId: 'SYSTEM_q2.mp3' }] },
						},
						{
							order: 3,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: true },
									{ key: 'D', isCorrect: false },
								],
							},
							questionTags: { create: this.tagNamesToIdInputs(['Photo Human Object']) },
							questionFiles: { create: [{ fileId: 'SYSTEM_3.jpg' }, { fileId: 'SYSTEM_q3.mp3' }] },
						},
						{
							order: 4,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: true },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: false },
									{ key: 'D', isCorrect: false },
								],
							},
							questionTags: { create: this.tagNamesToIdInputs(['Photo Human Object']) },
							questionFiles: { create: [{ fileId: 'SYSTEM_4.jpg' }, { fileId: 'SYSTEM_q4.mp3' }] },
						},
						{
							order: 5,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: true },
									{ key: 'C', isCorrect: false },
									{ key: 'D', isCorrect: false },
								],
							},
							questionTags: { create: this.tagNamesToIdInputs(['Photo Human Object']) },
							questionFiles: { create: [{ fileId: 'SYSTEM_5.jpg' }, { fileId: 'SYSTEM_q5.mp3' }] },
						},
						{
							order: 6,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: true },
									{ key: 'D', isCorrect: false },
								],
							},
							questionTags: { create: this.tagNamesToIdInputs(['Photo Human Object']) },
							questionFiles: { create: [{ fileId: 'SYSTEM_6.jpg' }, { fileId: 'SYSTEM_q6.mp3' }] },
						},
					],
				},
				sectionTags: { create: this.tagNamesToIdInputs(['TOEIC Listening Part 1']) },
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
									{ key: 'C', isCorrect: true },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q7.mp3' }] },
						},
						{
							order: 8,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: true },
									{ key: 'C', isCorrect: false },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q8.mp3' }] },
						},
						{
							order: 9,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: true },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: false },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q9.mp3' }] },
						},
						{
							order: 10,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: true },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: false },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q10.mp3' }] },
						},
						{
							order: 11,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: true },
									{ key: 'C', isCorrect: false },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q11.mp3' }] },
						},
						{
							order: 12,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: true },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q12.mp3' }] },
						},
						{
							order: 13,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: true },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q13.mp3' }] },
						},
						{
							order: 14,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: true },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: false },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q14.mp3' }] },
						},
						{
							order: 15,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: true },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: false },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q15.mp3' }] },
						},
						{
							order: 16,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: true },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q16.mp3' }] },
						},
						{
							order: 17,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: true },
									{ key: 'B', isCorrect: false },
									{ key: 'C', isCorrect: false },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q17.mp3' }] },
						},
						{
							order: 18,
							type: QuestionType.MultipleChoiceSingle,
							choices: {
								create: [
									{ key: 'A', isCorrect: false },
									{ key: 'B', isCorrect: true },
									{ key: 'C', isCorrect: false },
								],
							},
							questionFiles: { create: [{ fileId: 'SYSTEM_q18.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_q19.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_q20.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_q21.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_q22.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_23.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_24.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_25.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_26.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_27.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_28.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_29.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_30.mp3' }] },
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
							questionFiles: { create: [{ fileId: 'SYSTEM_31.mp3' }] },
						},
					],
				},
				sectionTags: { create: this.tagNamesToIdInputs(['TOEIC Listening Part 2']) },
			},
		];
	}
}
