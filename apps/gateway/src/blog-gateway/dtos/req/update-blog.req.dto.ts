import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateBlogDto {
	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Updated Blog Title', required: false })
	title?: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Updated content.', required: false })
	content?: string;

	@Expose()
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ApiProperty({ type: [String], example: ['study'], required: false })
	tags?: string[];
}
