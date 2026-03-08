import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateFlashCardDto {
	@Expose()
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'Apple', description: 'The word to learn' })
	word!: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'A fruit', description: 'Definition of the word' })
	definition!: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({
		example: 'https://example.com/apple.jpg',
		description: 'Image url',
		required: false,
	})
	image?: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'noun', description: 'Part of speech', required: false })
	partOfSpeech?: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: '/ˈæp.əl/', description: 'Pronunciation', required: false })
	pronunciation?: string;

	@Expose()
	@ArrayMaxSize(10)
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ApiProperty({
		type: [String],
		example: ['I ate an apple.'],
		description: 'Example sentences (max 10)',
		required: false,
	})
	examples?: string[];

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Remember to buy them.', description: 'Extra notes', required: false })
	notes?: string;

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
		example: ['geography', 'europe'],
		required: false,
		description: 'List of tags',
	})
	tags?: string[];
}
