import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

class MinimalAttemptInfo implements exam.UsersAttemptHistory_MinimalAttemptInfo {
	@Expose()
	durationLimit!: number;

	@Expose()
	endedAt?: Date;

	@Expose()
	id!: string;

	@Expose()
	isStrict!: boolean;

	@Expose()
	score?: number;

	@Expose()
	startedAt!: Date;

	@Expose()
	totalPoints?: number;
}

export class AttemptsHistory implements exam.UsersAttemptHistory {
	@Expose()
	@Type(() => MinimalAttemptInfo)
	attempts!: MinimalAttemptInfo[];

	@Expose()
	cursor!: string;
}
