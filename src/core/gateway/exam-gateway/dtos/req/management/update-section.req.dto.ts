import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto {
	@IsOptional()
	@IsString()
	contentType?: string | undefined;

	@IsOptional()
	@IsString()
	directive?: string | undefined;

	@IsOptional()
	@IsString()
	name?: string | undefined;

	@IsBoolean()
	@IsOptional()
	setNameNull?: boolean | undefined;
}
