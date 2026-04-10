import { ArrayUnique, IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExamDto {
	@IsOptional()
	@IsString()
	description?: string;

	@IsNumber()
	@IsOptional()
	duration?: number;

	@IsBoolean()
	@IsOptional()
	setDescriptionNull?: boolean;

	@IsOptional()
	@IsString()
	title?: string;

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	addTags: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	removeTags: string[] = [];
}
