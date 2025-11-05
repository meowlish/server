import { QuestionType } from '@core/exam/enums/question-type.enum';
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

import {
	AddAnswer as IAddAnswer,
	DeleteAnswer as IDeleteAnswer,
	UpdateQuestionDto as IUpdateQuestionDto,
} from '@common/generated/exam';

class AddAnswer implements IAddAnswer {
	@IsString()
	content!: string;

	@IsBoolean()
	isCorrect!: boolean;
}

class DeleteAnswer implements IDeleteAnswer {
	@IsString()
	content!: string;
}

export class UpdateQuestionDto implements IUpdateQuestionDto {
	@Type(() => AddAnswer)
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	addAnswers!: AddAnswer[];

	@IsOptional()
	@IsString()
	content?: string | undefined;

	@Type(() => DeleteAnswer)
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	deleteAnswers!: DeleteAnswer[];

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
