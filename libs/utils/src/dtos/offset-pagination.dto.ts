import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

@Exclude()
export class OffsetPaginationDto {
	@Expose()
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	@Min(0)
	page = 0;

	@Expose()
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	@IsPositive()
	limit = 10;
}
