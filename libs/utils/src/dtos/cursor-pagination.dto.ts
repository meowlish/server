import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

@Exclude()
export class CursorPaginationDto {
	@Expose()
	@IsOptional()
	cursor?: string;

	@Expose()
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	@IsPositive()
	limit = 10;
}
