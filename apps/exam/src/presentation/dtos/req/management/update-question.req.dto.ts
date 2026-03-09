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

class AddChoice implements exam.UpdateQuestionDto_AddChoice {
	@IsString()
	key!: string;

	@IsOptional()
	@IsString()
	content?: string;

	@IsBoolean()
	isCorrect!: boolean;
}

class UpdateChoice implements exam.UpdateQuestionDto_UpdateChoice {
	@IsString()
	id!: string;

	@IsOptional()
	@IsString()
	key?: string;

	@IsOptional()
	@IsString()
	content?: string;

	@IsBoolean()
	@IsOptional()
	isCorrect?: boolean;

	@IsBoolean()
	@IsOptional()
	setContentNull?: boolean;
}

export class UpdateQuestionDto implements exam.UpdateQuestionDto {
	@Type(() => AddChoice)
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	addChoices!: AddChoice[];

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	deleteChoicesIds!: string[];

	@Type(() => UpdateChoice)
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	updateChoicesIds!: UpdateChoice[];

	@IsOptional()
	@IsString()
	content?: string;

	@IsOptional()
	@IsString()
	explanation?: string;

	@IsString()
	id!: string;

	@IsInt()
	@IsOptional()
	@IsPositive()
	points?: number;

	@IsEnum(QuestionType)
	@IsOptional()
	type?: QuestionType;
}
