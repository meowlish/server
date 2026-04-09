import { exam } from '@server/generated';
import { SortDirection } from '@server/typing';
import { Type } from 'class-transformer';
import {
	ArrayNotEmpty,
	IsArray,
	IsEnum,
	IsIn,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	ValidateNested,
} from 'class-validator';

class FilterOptions implements exam.FindExamsDto_FilterOption {
	@IsOptional()
	@IsString()
	name?: string;

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	tags!: string[];
}

class SortOptions implements exam.FindExamsDto_SortOption {
	@IsIn(['attemptsCount', 'updatedAt'])
	key!: 'attemptsCount' | 'updatedAt';

	@IsEnum(SortDirection)
	direction!: SortDirection;
}

export class FindExamsDto implements exam.FindExamsDto {
	@Type(() => FilterOptions)
	@IsOptional()
	@ValidateNested()
	filter: FilterOptions | undefined;

	@Type(() => SortOptions)
	@IsOptional()
	@ValidateNested()
	sortBy: SortOptions | undefined;

	@IsOptional()
	@IsString()
	cursor?: string;

	@IsNumber()
	@IsOptional()
	@IsPositive()
	limit?: number;
}
