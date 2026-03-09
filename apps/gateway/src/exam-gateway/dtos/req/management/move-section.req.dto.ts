import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class MoveSectionDto {
	@IsInt()
	@IsOptional()
	index?: number;

	@IsOptional()
	@IsString()
	parentId?: string;

	@IsBoolean()
	@IsOptional()
	toRoot?: boolean;
}
