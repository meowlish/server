import { exam } from '@server/generated';
import { Expose, Transform } from 'class-transformer';

export class UserCalendar implements exam.AttemptHistorySummary {
	@Expose()
	history!: Record<string, number>;
}
