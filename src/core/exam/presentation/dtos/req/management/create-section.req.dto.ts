import { IsInt, IsOptional, IsString } from 'class-validator';

import { CreateSectionDto as ICreateSectionDto } from '@common/generated/exam';

export class CreateSectionDto implements ICreateSectionDto {
	@IsOptional()
	@IsString()
	examId?: string | undefined;

	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@IsOptional()
	@IsString()
	sectionId?: string | undefined;
}
