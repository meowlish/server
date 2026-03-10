import { exam } from '@server/generated';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class Options implements exam.AttemptDto_Options {
	@IsNumber()
	duration!: number;

	@IsOptional()
	@IsString({ each: true })
	sectionIds: string[] = [];
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
