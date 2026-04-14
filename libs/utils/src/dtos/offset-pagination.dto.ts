import { SortDirection } from '@server/typing';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class OffsetPaginationDto {
	@IsInt()
	@IsOptional()
	@Min(0)
	page = 0;

	@IsInt()
	@IsOptional()
	@IsPositive()
	limit = 10;

	@IsOptional()
	@IsString()
	sortBy = 'id';

	@IsEnum(SortDirection)
	@IsString()
	sortDirection = SortDirection.DESC;
}
