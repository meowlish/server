import { Expose, Type } from 'class-transformer';

export class AttemptDataDto {
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

class SectionDataDto {
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

class QuestionDataDto {
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

class ChoiceDataDto {
	@Expose()
	content?: string;

	@Expose()
	key!: string;
}

class ResponseDataDto {
	@Expose()
	answers!: string[];

	@Expose()
	isFlagged?: boolean;

	@Expose()
	note?: string;

	@Expose()
	questionId!: string;
}
