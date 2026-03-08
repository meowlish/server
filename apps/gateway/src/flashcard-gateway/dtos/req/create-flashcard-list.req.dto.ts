import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateFlashCardListDto {
	@Expose()
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'My First Deck', description: 'Name of the flash card list' })
	name!: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({
		example: 'A deck for learning geography',
		description: 'Description of the list',
		required: false,
	})
	description?: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'user-uuid-123', description: 'ID of the author' })
	authorId!: string;

	@Expose()
	@IsBoolean()
	@IsOptional()
	@ApiProperty({ example: true, description: 'Is the list public?', required: false })
	isPublic?: boolean;

	@Expose()
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ApiProperty({
		type: [String],
		example: ['geography', 'europe'],
		required: false,
		description: 'List of tags',
	})
	tags?: string[];
}
