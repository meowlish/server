import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
	ValidateNested,
} from 'class-validator';

class AddAnswer {
	@IsString()
	content!: string;

	@IsBoolean()
	isCorrect!: boolean;
}

export class UpdateQuestionDto {
	@Type(() => AddAnswer)
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	addAnswers!: AddAnswer[];

	@IsOptional()
	@IsString()
	content?: string | undefined;

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	deleteAnswersIds!: string[];

	@IsOptional()
	@IsString()
	explanation?: string | undefined;

	@IsInt()
	@IsOptional()
	@IsPositive()
	points?: number | undefined;

	@IsOptional()
	@IsString()
	type?: string | undefined;
}
