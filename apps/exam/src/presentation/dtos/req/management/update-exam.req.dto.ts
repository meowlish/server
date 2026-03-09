import { exam } from '@server/generated';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExamDto implements exam.UpdateExamDto {
	@IsOptional()
	@IsString()
	description?: string;

	@IsNumber()
	@IsOptional()
	duration?: number;

	@IsString()
	id!: string;

	@IsBoolean()
	@IsOptional()
	setDescriptionNull?: boolean;

	@IsOptional()
	@IsString()
	title?: string;
}
