import { achievement } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class FoundBadgesDto implements achievement.BadgesResponseDto {
	@Expose()
	@Type(() => BadgeDto)
	badges!: BadgeDto[];
}

export class BadgeDto implements achievement.Badges {
	@Expose()
	name!: string;

	@Expose()
	displayName!: string;

	@Expose()
	description!: string;
}
