import { Exclude, Expose, Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
	ValidateNested,
} from 'class-validator';

@Exclude()
class AddAnswer {
	@Expose()
	@IsString()
	content!: string;

	@Expose()
	@IsBoolean()
	isCorrect!: boolean;
}

@Exclude()
export class UpdateQuestionDto {
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
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	deleteAnswersIds!: string[];

	@Expose()
	@IsOptional()
	@IsString()
	explanation?: string | undefined;

	@Expose()
	@IsInt()
	@IsOptional()
	@IsPositive()
	points?: number | undefined;

	@Expose()
	@IsOptional()
	@IsString()
	type?: string | undefined;
}
