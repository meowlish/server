import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

class OptionsDto {
	@IsNumber()
	@IsOptional()
	@IsPositive()
	duration?: number;

	@IsOptional()
	@IsString({ each: true })
	sectionIds: string[] = [];
}

export class AttemptDto {
	@Type(() => OptionsDto)
	@IsOptional()
	@ValidateNested()
	options?: OptionsDto;
}
