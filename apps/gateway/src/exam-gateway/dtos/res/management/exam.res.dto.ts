import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ExamDetailedManagementInfoDto {
	@Expose()
	@ApiProperty({ type: String, format: 'date-time' })
	createdAt!: Date;

	@Expose()
	@ApiProperty()
	createdBy!: string;

	@Expose()
	@ApiPropertyOptional()
	description?: string;

	@Expose()
	@ApiProperty({ type: Number })
	duration!: number;

	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiProperty({ type: [String] })
	sectionIds!: string[];

	@Expose()
	@ApiProperty()
	status!: string;

	@Expose()
	@ApiProperty({ type: [String] })
	tags!: string[];

	@Expose()
	@ApiProperty()
	title!: string;

	@Expose()
	@ApiProperty({ type: String, format: 'date-time' })
	updatedAt!: Date;
}
