import { IsInt, IsOptional } from 'class-validator';

import { CreateSectionDto as ICreateSectionDto } from '@common/generated/exam';

export class CreateSectionDto implements ICreateSectionDto {
	@IsInt()
	@IsOptional()
	index?: number | undefined;
}
