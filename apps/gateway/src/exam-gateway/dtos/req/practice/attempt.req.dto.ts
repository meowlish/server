import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

class Options {
	@IsNumber()
	@IsOptional()
	@IsPositive()
	duration?: number;

	@IsOptional()
	@IsString({ each: true })
	sectionIds: string[] = [];
}

export class AttemptDto {
	@Type(() => Options)
	@IsOptional()
	@ValidateNested()
	options?: Options;
}
