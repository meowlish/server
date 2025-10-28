import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class CursorPaginationDto {
	@Expose()
	@IsOptional()
	cursor?: string;

	@Expose()
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	@IsPositive()
	limit: number = 10;
}
