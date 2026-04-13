import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FilePreviewDto {
	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiPropertyOptional()
	url?: string;
}
