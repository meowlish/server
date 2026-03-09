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

class AddChoice {
	@IsString()
	key!: string;

	@IsOptional()
	@IsString()
	content?: string;

	@IsBoolean()
	isCorrect!: boolean;
}

class UpdateChoice {
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

export class UpdateQuestionDto {
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

	@IsInt()
	@IsOptional()
	@IsPositive()
	points?: number;

	@IsOptional()
	@IsString()
	type?: string;
}
