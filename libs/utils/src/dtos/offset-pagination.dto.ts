import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class OffsetPaginationDto {
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	@Min(0)
	page = 0;

	@Type(() => Number)
	@IsInt()
	@IsOptional()
	@IsPositive()
	limit = 10;
}
