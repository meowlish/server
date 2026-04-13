import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserStatsDto {
	@Expose()
	@ApiProperty({ type: Number })
	attemptCounts!: number;

	@Expose()
	@ApiProperty({ type: Number })
	averageScoreInPercentage!: number;

	@Expose()
	@Type(() => TagInfoDto)
	@ApiProperty({ type: () => [TagInfoDto] })
	tagInfos!: TagInfoDto[];
}

class TagInfoDto {
	@Expose()
	@ApiProperty({ type: Number })
	correctPercentage!: number;

	@Expose()
	@ApiProperty()
	name!: string;
}
