import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class AttemptReview implements exam.DetailedAttemptReviewData {
	@Expose()
	durationLimit!: number;

	@Expose()
	endedAt!: Date;

	@Expose()
	@Type(() => ResponseReview)
	responses!: ResponseReview[];

	@Expose()
	@Type(() => SectionReview)
	sections!: SectionReview[];

	@Expose()
	startedAt!: Date;

	@Expose()
	totalPoints?: number;
}

class SectionReview implements exam.DetailedAttemptReviewData_SectionReviewData {
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
	@Type(() => QuestionReview)
	questions!: QuestionReview[];

	@Expose()
	@Type(() => SectionReview)
	sections!: SectionReview[];

	@Expose()
	type!: string;
}

class QuestionReview
	implements exam.DetailedAttemptReviewData_SectionReviewData_QuestionReviewData
{
	@Expose()
	@Type(() => Choice)
	choices!: Choice[];

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

class Choice
	implements exam.DetailedAttemptReviewData_SectionReviewData_QuestionReviewData_ChoiceReviewData
{
	@Expose()
	content?: string;

	@Expose()
	isCorrect!: boolean;

	@Expose()
	key!: string;
}

class ResponseReview implements exam.DetailedAttemptReviewData_AttemptReviewResponse {
	@Expose()
	additionalData?: object;

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
