import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateFlashCardListDto {
	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Updated Deck Name', required: false })
	name?: string;

	@Expose()
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Updated description', required: false })
	description?: string;

	@Expose()
	@IsBoolean()
	@IsOptional()
	@ApiProperty({ example: false, required: false })
	isPublic?: boolean;

	@Expose()
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ApiProperty({ type: [String], example: ['study'], required: false })
	tags?: string[];
}
