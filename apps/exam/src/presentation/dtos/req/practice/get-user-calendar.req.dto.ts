import { exam } from '@server/generated';
import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';

class TimeRangeDto implements exam.GetUsersAttemptSummaryDto_Range {
	@Type(() => Date)
	@IsDate()
	from!: Date;

	@Type(() => Date)
	@IsDate()
	to!: Date;
}

export class GetUserCalendarDto implements exam.GetUsersAttemptSummaryDto {
	@IsString()
	uid!: string;

	@Type(() => TimeRangeDto)
	@ValidateNested()
	range!: TimeRangeDto;
}
