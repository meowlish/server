import { QuestionType } from '../../../../enums/question-type.enum';
import { exam } from '@server/generated';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
	ValidateNested,
} from 'class-validator';

class AddAnswer implements exam.UpdateQuestionDto_AddAnswer {
	@IsString()
	content!: string;

	@IsBoolean()
	isCorrect!: boolean;
}

export class UpdateQuestionDto implements exam.UpdateQuestionDto {
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

	@IsString()
	id!: string;

	@IsInt()
	@IsOptional()
	@IsPositive()
	points?: number | undefined;

	@IsEnum(QuestionType)
	@IsOptional()
	type?: QuestionType | undefined;
}
