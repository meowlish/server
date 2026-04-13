import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SortDirection } from '@server/typing';
import { Type } from 'class-transformer';
import {
	IsEnum,
	IsIn,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	ValidateNested,
} from 'class-validator';

class SortOptionsDto {
	@IsIn(['endedAt', 'startedAt', 'examId', 'score'])
	@ApiProperty({ enum: ['endedAt', 'startedAt', 'examId', 'score'] })
	key!: 'endedAt' | 'startedAt' | 'examId' | 'score';

	@IsEnum(SortDirection)
	@ApiProperty({ enum: SortDirection })
	direction!: SortDirection;
}

export class GetUsersAttemptHistoryDto {
	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	examId?: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	cursor?: string;

	@IsNumber()
	@IsOptional()
	@IsPositive()
	@ApiPropertyOptional({ type: Number })
	limit?: number;

	@Type(() => SortOptionsDto)
	@IsOptional()
	@ValidateNested()
	@ApiPropertyOptional({ type: () => SortOptionsDto })
	sortBy?: SortOptionsDto;
}
