import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class AttemptData implements exam.AttemptSavedData {
	@Expose()
	durationLimit!: number;

	@Expose()
	@Type(() => ResponseData)
	responses!: ResponseData[];

	@Expose()
	@Type(() => SectionData)
	sections!: SectionData[];

	@Expose()
	startedAt!: Date;
}

class SectionData implements exam.AttemptSavedData_AttemptSectionData {
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
	@Type(() => QuestionData)
	questions!: QuestionData[];

	@Expose()
	sections!: exam.AttemptSavedData_AttemptSectionData[];

	@Expose()
	type!: string;
}

class QuestionData implements exam.AttemptSavedData_AttemptSectionData_AttemptQuestionData {
	@Expose()
	@Type(() => ChoiceData)
	choices!: ChoiceData[];

	@Expose()
	content?: string;

	@Expose()
	fileUrls!: string[];

	@Expose()
	id!: string;

	@Expose()
	order!: number;

	@Expose()
	type!: string;
}

class ChoiceData
	implements exam.AttemptSavedData_AttemptSectionData_AttemptQuestionData_AttemptChoiceData
{
	@Expose()
	content!: string;

	@Expose()
	key!: string;
}

class ResponseData implements exam.AttemptSavedData_AttemptSavedResponse {
	@Expose()
	answers!: string[];

	@Expose()
	isFlagged?: boolean;

	@Expose()
	note?: string;

	@Expose()
	questionId!: string;
}
