import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class CursorPaginationDto {
	@IsOptional()
	cursor?: string;

	@Type(() => Number)
	@IsInt()
	@IsOptional()
	@IsPositive()
	limit = 10;
}
