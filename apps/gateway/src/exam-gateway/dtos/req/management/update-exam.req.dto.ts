import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateExamDto {
	@Expose()
	@IsOptional()
	@IsString()
	description?: string | undefined;

	@Expose()
	@IsNumber()
	@IsOptional()
	duration?: number | undefined;

	@Expose()
	@IsBoolean()
	@IsOptional()
	setDescriptionNull?: boolean | undefined;

	@Expose()
	@IsOptional()
	@IsString()
	title?: string | undefined;
}
