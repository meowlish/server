import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

@Exclude()
export class MoveSectionDto {
	@Expose()
	@IsInt()
	@IsOptional()
	index?: number | undefined;

	@Expose()
	@IsOptional()
	@IsString()
	parentId?: string | undefined;

	@Expose()
	@IsBoolean()
	@IsOptional()
	toRoot?: boolean | undefined;
}
