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

class DeleteAnswer {
	@IsString()
	content!: string;
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

	@Type(() => DeleteAnswer)
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	deleteAnswers!: DeleteAnswer[];

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
