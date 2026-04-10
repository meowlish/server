import { ArrayUnique, IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto {
	@IsOptional()
	@IsString()
	contentType?: string;

	@IsOptional()
	@IsString()
	directive?: string;

	@IsOptional()
	@IsString()
	name?: string;

	@IsBoolean()
	@IsOptional()
	setNameNull?: boolean;

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	addTags: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	removeTags: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	addFiles: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	removeFiles: string[] = [];
}
