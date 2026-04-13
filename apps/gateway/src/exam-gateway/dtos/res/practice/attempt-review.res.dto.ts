import { Expose, Type } from 'class-transformer';

export class AttemptReviewDto {
	@Expose()
	durationLimit!: number;

	@Expose()
	endedAt!: Date;

	@Expose()
	@Type(() => ResponseReviewDto)
	responses!: ResponseReviewDto[];

	@Expose()
	@Type(() => SectionReviewDto)
	sections!: SectionReviewDto[];

	@Expose()
	startedAt!: Date;

	@Expose()
	totalPoints?: number;
}

class SectionReviewDto {
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
	@Type(() => QuestionReviewDto)
	questions!: QuestionReviewDto[];

	@Expose()
	@Type(() => SectionReviewDto)
	sections!: SectionReviewDto[];

	@Expose()
	type!: string;
}

class QuestionReviewDto {
	@Expose()
	@Type(() => ChoiceDto)
	choices!: ChoiceDto[];

	@Expose()
	content!: string;

	@Expose()
	fileUrls!: string[];

	@Expose()
	id!: string;

	@Expose()
	order!: number;

	@Expose()
	points!: number;

	@Expose()
	tags!: string[];

	@Expose()
	type!: string;
}

class ChoiceDto {
	@Expose()
	content?: string;

	@Expose()
	isCorrect!: boolean;

	@Expose()
	key!: string;
}

class ResponseReviewDto {
	@Expose()
	additionalData?: string;

	@Expose()
	answers!: string[];

	@Expose()
	isCorrect?: boolean;

	@Expose()
	isFlagged?: boolean;

	@Expose()
	note?: string;

	@Expose()
	questionId!: string;
}
