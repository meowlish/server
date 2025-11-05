import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class MoveSectionDto {
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
