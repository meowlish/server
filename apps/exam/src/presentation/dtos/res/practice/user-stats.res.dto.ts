import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class UserStatsDto implements exam.UserStats {
	@Expose()
	attemptCounts!: number;

	@Expose()
	averageScoreInPercentage!: number;

	@Expose()
	@Type(() => TagInfoDto)
	tagInfos!: TagInfoDto[];
}

class TagInfoDto implements exam.UserStats_TagInfo {
	@Expose()
	correctPercentage!: number;

	@Expose()
	name!: string;
}
