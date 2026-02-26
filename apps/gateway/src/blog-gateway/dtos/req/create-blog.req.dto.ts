import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
	@ApiProperty({ example: 'My First Blog', description: 'Title of the blog' })
	@IsString()
	@IsNotEmpty()
	title!: string;

	@ApiProperty({ example: 'This is the content of the blog.', description: 'Content of the blog' })
	@IsString()
	@IsNotEmpty()
	content!: string;

	@ApiProperty({ example: 'user-uuid-123', description: 'ID of the author' })
	@IsString()
	@IsNotEmpty()
	authorId!: string;

	@ApiProperty({ type: [String], example: ['study', 'abroad'], required: false, description: 'List of tags' })
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	tags?: string[];
}
