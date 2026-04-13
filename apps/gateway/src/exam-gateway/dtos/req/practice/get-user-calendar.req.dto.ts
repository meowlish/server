import { Type } from 'class-transformer';
import { IsDate, ValidateNested } from 'class-validator';

class TimeRangeDto {
	@Type(() => Date)
	@IsDate()
	from!: Date;

	@Type(() => Date)
	@IsDate()
	to!: Date;
}

export class GetUserCalendarDto {
	@Type(() => TimeRangeDto)
	@ValidateNested()
	range!: TimeRangeDto;
}
