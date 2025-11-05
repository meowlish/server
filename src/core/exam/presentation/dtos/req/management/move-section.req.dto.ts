import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

import { MoveSectionDto as IMoveSectionDto } from '@common/generated/exam';

export class MoveSectionDto implements IMoveSectionDto {
	@IsString()
	id!: string;

	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@IsOptional()
	@IsString()
	parentId?: string | undefined;

	@IsBoolean()
	@IsOptional()
	toRoot?: boolean | undefined;
}
