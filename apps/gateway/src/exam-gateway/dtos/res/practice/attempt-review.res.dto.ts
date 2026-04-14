import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AttemptReviewDto {
	@Expose()
	@ApiProperty({ type: Number })
	durationLimit!: number;

	@Expose()
	@ApiProperty({ type: String, format: 'date-time' })
	endedAt!: Date;

	@Expose()
	@Type(() => ResponseReviewDto)
	@ApiProperty({ type: () => [ResponseReviewDto] })
	responses!: ResponseReviewDto[];

	@Expose()
	@Type(() => SectionReviewDto)
	@ApiProperty({ type: () => [SectionReviewDto] })
	sections!: SectionReviewDto[];

	@Expose()
	@ApiProperty({ type: String, format: 'date-time' })
	startedAt!: Date;

	@Expose()
	@ApiPropertyOptional({ type: Number })
	totalPoints?: number;
}

class SectionReviewDto {
	@Expose()
	@ApiProperty()
	directive!: string;

	@Expose()
	@ApiProperty({ type: [String] })
	fileUrls!: string[];

	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiPropertyOptional()
	name?: string;

	@Expose()
	@ApiProperty({ type: Number })
	order!: number;

	@Expose()
	@Type(() => QuestionReviewDto)
	@ApiProperty({ type: () => [QuestionReviewDto] })
	questions!: QuestionReviewDto[];

	@Expose()
	@Type(() => SectionReviewDto)
	@ApiProperty({ type: () => [SectionReviewDto] })
	sections!: SectionReviewDto[];

	@Expose()
	@ApiProperty()
	type!: string;
}

class QuestionReviewDto {
	@Expose()
	@Type(() => ChoiceDto)
	@ApiProperty({ type: () => [ChoiceDto] })
	choices!: ChoiceDto[];

	@Expose()
	@ApiProperty()
	content!: string;

	@Expose()
	@ApiProperty({ type: [String] })
	fileUrls!: string[];

	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiProperty({ type: Number })
	order!: number;

	@Expose()
	@ApiProperty({ type: Number })
	points!: number;

	@Expose()
	@ApiProperty({ type: [String] })
	tags!: string[];

	@Expose()
	@ApiProperty()
	type!: string;
}

class ChoiceDto {
	@Expose()
	@ApiPropertyOptional()
	content?: string;

	@Expose()
	@ApiProperty()
	isCorrect!: boolean;

	@Expose()
	@ApiProperty()
	key!: string;
}

class ResponseReviewDto {
	@Expose()
	@ApiPropertyOptional()
	additionalData?: string;

	@Expose()
	@ApiProperty({ type: [String] })
	answers!: string[];

	@Expose()
	@ApiPropertyOptional()
	isCorrect?: boolean;

	@Expose()
	@ApiPropertyOptional()
	isFlagged?: boolean;

	@Expose()
	@ApiPropertyOptional()
	note?: string;

	@Expose()
	@ApiProperty()
	questionId!: string;
}
