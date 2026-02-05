import { QuestionType } from '../../../../enums/question-type.enum';
import { exam } from '@server/generated';
import { Exclude, Expose, Type } from 'class-transformer';
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

@Exclude()
class AddAnswer implements exam.AddAnswer {
	@Expose()
	@IsString()
	content!: string;

	@Expose()
	@IsBoolean()
	isCorrect!: boolean;
}

@Exclude()
class DeleteAnswer implements exam.DeleteAnswer {
	@Expose()
	@IsString()
	content!: string;
}

@Exclude()
export class UpdateQuestionDto implements exam.UpdateQuestionDto {
	@Expose()
	@Type(() => AddAnswer)
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	addAnswers!: AddAnswer[];

	@Expose()
	@IsOptional()
	@IsString()
	content?: string | undefined;

	@Expose()
	@Type(() => DeleteAnswer)
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	deleteAnswers!: DeleteAnswer[];

	@Expose()
	@IsOptional()
	@IsString()
	explanation?: string | undefined;

	@Expose()
	@IsString()
	id!: string;

	@Expose()
	@IsInt()
	@IsOptional()
	@IsPositive()
	points?: number | undefined;

	@Expose()
	@IsEnum(QuestionType)
	@IsOptional()
	type?: QuestionType | undefined;
}
