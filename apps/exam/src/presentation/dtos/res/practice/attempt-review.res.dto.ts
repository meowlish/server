import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class AttemptReviewDto implements exam.DetailedAttemptReviewData {
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

class SectionReviewDto implements exam.DetailedAttemptReviewData_SectionReviewData {
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

class QuestionReviewDto
	implements exam.DetailedAttemptReviewData_SectionReviewData_QuestionReviewData
{
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

class ChoiceDto
	implements exam.DetailedAttemptReviewData_SectionReviewData_QuestionReviewData_ChoiceReviewData
{
	@Expose()
	content?: string;

	@Expose()
	isCorrect!: boolean;

	@Expose()
	key!: string;
}

class ResponseReviewDto implements exam.DetailedAttemptReviewData_AttemptReviewResponse {
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
