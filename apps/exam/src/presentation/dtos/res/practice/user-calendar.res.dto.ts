import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class UserCalendar implements exam.AttemptHistorySummary {
	@Expose()
	history!: Record<number, number>;
}
