import { Type } from 'class-transformer';
import {
	ArrayUnique,
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
	@ValidateNested({ each: true })
	addChoices: AddChoice[] = [];

	@IsArray()
	@IsString({ each: true })
	deleteChoicesIds: string[] = [];

	@Type(() => UpdateChoice)
	@IsArray()
	@ValidateNested({ each: true })
	updateChoices: UpdateChoice[] = [];

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

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	addTags: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	removeTags: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	addFiles: string[] = [];

	@IsArray()
	@IsString({ each: true })
	@ArrayUnique()
	removeFiles: string[] = [];
}
