import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateBlogDto {
	@Expose()
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'My First Blog', description: 'Title of the blog' })
	title!: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'This is the content of the blog.', description: 'Content of the blog' })
	content!: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'user-uuid-123', description: 'ID of the author' })
	authorId!: string;

	@Expose()
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ApiProperty({
		type: [String],
		example: ['study', 'abroad'],
		required: false,
		description: 'List of tags',
	})
	tags?: string[];
}
