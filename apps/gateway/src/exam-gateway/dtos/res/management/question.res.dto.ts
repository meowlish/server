import { FilePreviewDto } from './file-preview.res.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class ChoiceDto {
	@Expose()
	@ApiPropertyOptional()
	content?: string;

	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiProperty()
	isCorrect!: boolean;

	@Expose()
	@ApiProperty()
	key!: string;

	@Expose()
	@ApiProperty()
	questionId!: string;
}

export class QuestionManagementInfoDto {
	@Expose()
	@Type(() => ChoiceDto)
	@ApiProperty({ type: () => [ChoiceDto] })
	choices!: ChoiceDto[];

	@Expose()
	@ApiProperty()
	content!: string;

	@Expose()
	@ApiProperty()
	explanation!: string;

	@Expose()
	@Type(() => FilePreviewDto)
	@ApiProperty({ type: () => [FilePreviewDto] })
	files!: FilePreviewDto[];

	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiProperty({ type: Number })
	points!: number;

	@Expose()
	@ApiProperty()
	sectionId!: string;

	@Expose()
	@ApiProperty({ type: [String] })
	tags!: string[];

	@Expose()
	@ApiProperty()
	type!: string;
}
