import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateFlashCardDto {
	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Apple', required: false })
	word?: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'A fruit', required: false })
	definition?: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'https://example.com/apple.jpg', required: false })
	image?: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'noun', required: false })
	partOfSpeech?: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: '/ˈæp.əl/', required: false })
	pronunciation?: string;

	@Expose()
	@ArrayMaxSize(10)
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ApiProperty({ type: [String], example: ['I ate an apple.'], required: false })
	examples?: string[];

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Remember to buy them.', required: false })
	notes?: string;

	@Expose()
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ApiProperty({ type: [String], example: ['study'], required: false })
	tags?: string[];
}
