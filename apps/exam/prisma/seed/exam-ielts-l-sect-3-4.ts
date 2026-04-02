import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma } from '@prisma-client/exam';

export class IeltsLExamSect34Seeder {
	constructor(private readonly tagNamesToIdInputs: (names: string[]) => { tagId: string }[]) {}

	seed(): Prisma.SectionCreateWithoutExamInput[] {
		return [
			{
				id: 's23',
				order: 3,
				contentType: SectionType.Section,
				childSections: {
					create: [
						{
							id: 's231',
							examId: '2',
							order: 1,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 21,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 22,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 23,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 24,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 25,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 26,
										type: QuestionType.FillAnyInTheBlank,
									},
								],
							},
						},
						{
							id: 's232',
							examId: '2',
							order: 2,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 27,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 28,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 29,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 30,
										type: QuestionType.FillAnyInTheBlank,
									},
								],
							},
						},
					],
				},
			},
			{
				id: 's24',
				order: 4,
				contentType: SectionType.Section,
				childSections: {
					create: [
						{
							id: 's241',
							examId: '2',
							order: 1,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 31,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 32,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 33,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 34,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 35,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 36,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 37,
										type: QuestionType.FillAnyInTheBlank,
									},
								],
							},
						},
						{
							id: 's242',
							examId: '2',
							order: 2,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 38,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 39,
										type: QuestionType.FillAnyInTheBlank,
									},
									{
										order: 40,
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
