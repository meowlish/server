import { Expose, Type } from 'class-transformer';

class MinimalAttemptInfoDto {
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

export class AttemptsHistoryDto {
	@Expose()
	@Type(() => MinimalAttemptInfoDto)
	attempts!: MinimalAttemptInfoDto[];

	@Expose()
	cursor!: string;
}
