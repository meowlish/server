import { exam } from '@server/generated';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExamDto implements exam.UpdateExamDto {
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
