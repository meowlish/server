import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
	@ApiProperty({ example: 'Updated Blog Title', required: false })
	@IsString()
	@IsOptional()
	title?: string;

	@ApiProperty({ example: 'Updated content.', required: false })
	@IsString()
	@IsOptional()
	content?: string;

	@ApiProperty({ type: [String], example: ['study'], required: false })
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	tags?: string[];
}
