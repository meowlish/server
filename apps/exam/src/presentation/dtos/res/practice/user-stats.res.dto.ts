import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class UserStats implements exam.UserStats {
	@Expose()
	attemptCounts!: number;

	@Expose()
	averageScoreInPercentage!: number;

	@Expose()
	@Type(() => TagInfo)
	tagInfos!: TagInfo[];
}

class TagInfo implements exam.UserStats_TagInfo {
	@Expose()
	correctPercentage!: number;

	@Expose()
	name!: string;
}
