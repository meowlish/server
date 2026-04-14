import { QuestionType } from '../../src/enums/question-type.enum';
import { SectionType } from '../../src/enums/section-type.enum';
import { Prisma } from '@prisma-client/exam';

export class IeltsRExamSect3Seeder {
	constructor(private readonly tagNamesToIdInputs: (names: string[]) => { tagId: string }[]) {}

	seed(): Prisma.SectionCreateWithoutExamInput[] {
		return [
			{
				id: 's33',
				order: 3,
				contentType: SectionType.Section,
				childSections: {
					create: [
						{
							id: 's331',
							examId: '3',
							order: 1,
							contentType: SectionType.Question,
							questions: {
								create: [
									{
										order: 27,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 28,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 29,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 30,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 31,
										type: QuestionType.FillExactInTheBlank,
									},
									{
										order: 32,
										type: QuestionType.FillExactInTheBlank,
									},
								],
							},
						},
						{
							id: 's332',
							examId: '3',
							order: 2,
							contentType: SectionType.Question,
							questions: {
								create: [
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
