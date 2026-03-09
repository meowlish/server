import { IsBoolean, IsOptional, IsString } from 'class-validator';

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
}
