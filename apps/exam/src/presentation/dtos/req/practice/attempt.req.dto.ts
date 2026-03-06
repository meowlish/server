import { exam } from '@server/generated';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class Options implements exam.AttemptDto_Options {
	@IsNumber()
	duration!: number;

	@IsBoolean()
	isStrict!: boolean;

	@IsString({ each: true })
	sectionIds!: string[];
}

export class AttemptDto implements exam.AttemptDto {
	@IsString()
	examId!: string;

	@IsString()
	userId!: string;

	@Type(() => Options)
	@IsOptional()
	@ValidateNested()
	options?: Options;
}
