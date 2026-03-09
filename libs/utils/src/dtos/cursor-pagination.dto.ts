import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class CursorPaginationDto {
	@IsOptional()
	cursor?: string;

	@IsInt()
	@IsOptional()
	@IsPositive()
	limit = 10;
}
