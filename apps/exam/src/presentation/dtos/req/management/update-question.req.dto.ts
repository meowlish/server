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

class AddAnswer implements exam.AddAnswer {
	@IsString()
	content!: string;

	@IsBoolean()
	isCorrect!: boolean;
}

class DeleteAnswer implements exam.DeleteAnswer {
	@IsString()
	content!: string;
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
