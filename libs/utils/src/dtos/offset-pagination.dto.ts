import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class OffsetPaginationDto {
	@IsInt()
	@IsOptional()
	@Min(0)
	page = 0;

	@IsInt()
	@IsOptional()
	@IsPositive()
	limit = 10;
}
