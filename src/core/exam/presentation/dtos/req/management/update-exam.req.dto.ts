import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { UpdateExamDto as IUpdateExamDto } from '@common/generated/exam';

export class UpdateExamDto implements IUpdateExamDto {
	@IsOptional()
	@IsString()
	description?: string | undefined;

	@IsNumber()
	@IsOptional()
	duration?: number | undefined;

	@IsString()
	id!: string;

	@IsBoolean()
	@IsOptional()
	setDescriptionNull?: boolean | undefined;

	@IsOptional()
	@IsString()
	title?: string | undefined;
}
