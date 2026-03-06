import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExamDto {
	@IsOptional()
	@IsString()
	description?: string | undefined;

	@IsNumber()
	@IsOptional()
	duration?: number | undefined;

	@IsBoolean()
	@IsOptional()
	setDescriptionNull?: boolean | undefined;

	@IsOptional()
	@IsString()
	title?: string | undefined;
}
