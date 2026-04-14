import { SortDirection } from '@server/typing';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CursorPaginationDto {
	@IsOptional()
	cursor?: string;

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
