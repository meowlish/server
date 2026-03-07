import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';

class Options {
	@IsNumber()
	duration!: number;

	@IsBoolean()
	isStrict!: boolean;

	@IsString({ each: true })
	sectionIds!: string[];
}

export class AttemptDto {
	@IsString()
	examId!: string;

	@IsString()
	userId!: string;

	@Type(() => Options)
	@ValidateNested()
	options!: Options;
}
