import { SortDirection } from '@server/typing';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsEnum,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

class TimeRangeDto {
	@Type(() => Date)
	@IsDate()
	from!: Date;

	@Type(() => Date)
	@IsDate()
	to!: Date;
}

class FilterOptionsDto {
	@IsOptional()
	@IsString()
	createdBy?: string;

	@Type(() => TimeRangeDto)
	@IsOptional()
	@ValidateNested()
	createdTimeRange?: TimeRangeDto;

	@IsOptional()
	@IsString()
	status?: string;

	@IsOptional()
	@IsString()
	title?: string;

	@Type(() => TimeRangeDto)
	@IsOptional()
	@ValidateNested()
	updatedTimeRange?: TimeRangeDto;
}

class SortOptionsDto {
	@IsEnum(SortDirection)
	direction!: SortDirection;

	@IsIn(['updatedAt', 'createdAt'])
	@IsString()
	key!: 'updatedAt' | 'createdAt';
}

export class FindExamsForManagentDto {
	@IsOptional()
	@IsString()
	cursor?: string;

	@Type(() => FilterOptionsDto)
	@IsOptional()
	@ValidateNested()
	filter?: FilterOptionsDto;

	@IsNumber()
	@IsOptional()
	limit?: number;

	@Type(() => SortOptionsDto)
	@IsOptional()
	@ValidateNested()
	sortBy?: SortOptionsDto;
}
