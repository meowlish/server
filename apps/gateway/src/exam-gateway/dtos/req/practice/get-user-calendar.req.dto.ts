import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, ValidateNested } from 'class-validator';

class TimeRangeDto {
	@Type(() => Date)
	@IsDate()
	@ApiProperty({ type: String, format: 'date-time' })
	from!: Date;

	@Type(() => Date)
	@IsDate()
	@ApiProperty({ type: String, format: 'date-time' })
	to!: Date;
}

export class GetUserCalendarDto {
	@Type(() => TimeRangeDto)
	@ValidateNested()
	@ApiProperty({ type: () => TimeRangeDto })
	range!: TimeRangeDto;
}
