import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto {
	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	contentType?: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	directive?: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	name?: string;

	@IsBoolean()
	@IsOptional()
	@ApiPropertyOptional()
	setNameNull?: boolean;

	@IsArray()
	@IsString({ each: true })
	@ApiProperty({ type: [String] })
	@ArrayUnique()
	addTags: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ApiProperty({ type: [String] })
	@ArrayUnique()
	removeTags: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ApiProperty({ type: [String] })
	@ArrayUnique()
	addFiles: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ApiProperty({ type: [String] })
	@ArrayUnique()
	removeFiles: string[] = [];
}
