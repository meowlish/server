import { exam } from '@server/generated';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

class OptionsDto implements exam.AttemptDto_Options {
	@IsNumber()
	@IsOptional()
	@IsPositive()
	duration?: number;

	@IsOptional()
	@IsString({ each: true })
	sectionIds: string[] = [];
}

export class AttemptDto implements exam.AttemptDto {
	@IsString()
	examId!: string;

	@IsString()
	userId!: string;

	@Type(() => OptionsDto)
	@IsOptional()
	@ValidateNested()
	options?: OptionsDto;
}
