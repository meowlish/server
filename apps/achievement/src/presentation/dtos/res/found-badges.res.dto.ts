import { achievement } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class FoundBadgesDto implements achievement.BadgesResponseDto {
	@Expose()
	@Type(() => Badge)
	badges!: Badge[];
}

export class Badge {
	@Expose()
	name!: string;

	@Expose()
	displayName!: string;

	@Expose()
	description!: string;
}
