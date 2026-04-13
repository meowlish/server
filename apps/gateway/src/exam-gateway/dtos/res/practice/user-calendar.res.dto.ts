import { Expose } from 'class-transformer';

export class UserCalendarDto {
	@Expose()
	history!: Record<number, number>;
}
