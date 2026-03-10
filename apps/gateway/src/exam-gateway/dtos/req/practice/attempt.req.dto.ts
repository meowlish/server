import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class Options {
	@IsNumber()
	duration!: number;

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
