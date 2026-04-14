import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AttemptDataDto {
	@Expose()
	@ApiProperty({ type: Number })
	durationLimit!: number;

	@Expose()
	@Type(() => ResponseDataDto)
	@ApiProperty({ type: () => [ResponseDataDto] })
	responses!: ResponseDataDto[];

	@Expose()
	@Type(() => SectionDataDto)
	@ApiProperty({ type: () => [SectionDataDto] })
	sections!: SectionDataDto[];

	@Expose()
	@ApiProperty({ type: String, format: 'date-time' })
	startedAt!: Date;
}

class SectionDataDto {
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
	@Type(() => QuestionDataDto)
	@ApiProperty({ type: () => [QuestionDataDto] })
	questions!: QuestionDataDto[];

	@Expose()
	@Type(() => SectionDataDto)
	@ApiProperty({ type: () => [SectionDataDto] })
	sections!: SectionDataDto[];

	@Expose()
	@ApiProperty()
	type!: string;
}

class QuestionDataDto {
	@Expose()
	@Type(() => ChoiceDataDto)
	@ApiProperty({ type: () => [ChoiceDataDto] })
	choices!: ChoiceDataDto[];

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
	@ApiProperty()
	type!: string;
}

class ChoiceDataDto {
	@Expose()
	@ApiPropertyOptional()
	content?: string;

	@Expose()
	@ApiProperty()
	key!: string;
}

class ResponseDataDto {
	@Expose()
	@ApiProperty({ type: [String] })
	answers!: string[];

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
