import { exam } from '@server/generated';
import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';

class TimeRange implements exam.GetUsersAttemptSummaryDto_Range {
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

	@Type(() => TimeRange)
	@ValidateNested()
	range!: TimeRange;
}
