import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class UserCalendarDto implements exam.AttemptHistorySummary {
	@Expose()
	history!: Record<number, number>;
}
