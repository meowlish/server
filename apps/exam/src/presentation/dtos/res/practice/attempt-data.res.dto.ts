import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class AttemptDataDto implements exam.AttemptSavedData {
	@Expose()
	durationLimit!: number;

	@Expose()
	@Type(() => ResponseDataDto)
	responses!: ResponseDataDto[];

	@Expose()
	@Type(() => SectionDataDto)
	sections!: SectionDataDto[];

	@Expose()
	startedAt!: Date;
}

class SectionDataDto implements exam.AttemptSavedData_AttemptSectionData {
	@Expose()
	directive!: string;

	@Expose()
	fileUrls!: string[];

	@Expose()
	id!: string;

	@Expose()
	name?: string;

	@Expose()
	order!: number;

	@Expose()
	@Type(() => QuestionDataDto)
	questions!: QuestionDataDto[];

	@Expose()
	@Type(() => SectionDataDto)
	sections!: SectionDataDto[];

	@Expose()
	type!: string;
}

class QuestionDataDto implements exam.AttemptSavedData_AttemptSectionData_AttemptQuestionData {
	@Expose()
	@Type(() => ChoiceDataDto)
	choices!: ChoiceDataDto[];

	@Expose()
	content!: string;

	@Expose()
	fileUrls!: string[];

	@Expose()
	id!: string;

	@Expose()
	order!: number;

	@Expose()
	type!: string;
}

class ChoiceDataDto
	implements exam.AttemptSavedData_AttemptSectionData_AttemptQuestionData_AttemptChoiceData
{
	@Expose()
	content?: string;

	@Expose()
	key!: string;
}

class ResponseDataDto implements exam.AttemptSavedData_AttemptSavedResponse {
	@Expose()
	answers!: string[];

	@Expose()
	isFlagged?: boolean;

	@Expose()
	note?: string;

	@Expose()
	questionId!: string;
}
