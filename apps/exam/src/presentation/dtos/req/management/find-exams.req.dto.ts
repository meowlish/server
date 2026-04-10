import { ExamStatus } from '../../../../enums/exam-status.enum';
import { exam } from '@server/generated';
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

class TimeRange implements exam.FindExamsManagementDto_TimeRange {
	@Type(() => Date)
	@IsDate()
	from!: Date;

	@Type(() => Date)
	@IsDate()
	to!: Date;
}

class FilterOptions implements exam.FindExamsManagementDto_FilterOption {
	@IsOptional()
	@IsString()
	createdBy?: string;

	@Type(() => TimeRange)
	@IsOptional()
	@ValidateNested()
	createdTimeRange?: TimeRange;

	@IsEnum(ExamStatus)
	@IsOptional()
	status?: ExamStatus;

	@IsOptional()
	@IsString()
	title?: string;

	@Type(() => TimeRange)
	@IsOptional()
	@ValidateNested()
	updatedTimeRange?: TimeRange;
}

class SortOptions implements exam.FindExamsManagementDto_SortOption {
	@IsEnum(SortDirection)
	direction!: SortDirection;

	@IsIn(['updatedAt', 'createdAt'])
	@IsString()
	key!: 'updatedAt' | 'createdAt';
}

export class FindExamsForManagentDto implements exam.FindExamsManagementDto {
	@IsOptional()
	@IsString()
	cursor?: string;

	@Type(() => FilterOptions)
	@IsOptional()
	@ValidateNested()
	filter?: FilterOptions;

	@IsNumber()
	@IsOptional()
	limit?: number;

	@Type(() => SortOptions)
	@IsOptional()
	@ValidateNested()
	sortBy?: SortOptions;
}
