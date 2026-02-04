import { exam } from '@server/generated';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class MoveSectionDto implements exam.MoveSectionDto {
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
