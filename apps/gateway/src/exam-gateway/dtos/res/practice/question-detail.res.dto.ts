import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class QuestionDetailDto {
	@Expose()
	@ApiProperty()
	content!: string;

	@Expose()
	@ApiProperty()
	explanation!: string;

	@Expose()
	@ApiProperty({ type: [String] })
	fileUrls!: string[];

	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiProperty({ type: Number })
	points!: number;

	@Expose()
	@Type(() => SectionContextDto)
	@ApiProperty({ type: () => [SectionContextDto] })
	sectionContext!: SectionContextDto[];

	@Expose()
	@ApiProperty()
	type!: string;
}

class SectionContextDto {
	@Expose()
	@ApiPropertyOptional()
	content?: string;

	@Expose()
	@ApiProperty({ type: [String] })
	fileUrls!: string[];
}
