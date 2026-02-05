import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateSectionDto {
	@Expose()
	@IsOptional()
	@IsString()
	contentType?: string | undefined;

	@Expose()
	@IsOptional()
	@IsString()
	directive?: string | undefined;

	@Expose()
	@IsOptional()
	@IsString()
	name?: string | undefined;

	@Expose()
	@IsBoolean()
	@IsOptional()
	setNameNull?: boolean | undefined;
}
