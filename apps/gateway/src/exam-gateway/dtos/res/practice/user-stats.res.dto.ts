import { Expose, Type } from 'class-transformer';

export class UserStatsDto {
	@Expose()
	attemptCounts!: number;

	@Expose()
	averageScoreInPercentage!: number;

	@Expose()
	@Type(() => TagInfoDto)
	tagInfos!: TagInfoDto[];
}

class TagInfoDto {
	@Expose()
	correctPercentage!: number;

	@Expose()
	name!: string;
}
