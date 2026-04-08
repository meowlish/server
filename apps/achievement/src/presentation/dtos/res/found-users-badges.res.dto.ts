import { Badge } from './found-badges.res.dto';
import { achievement } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class FoundUsersBadgesDto implements achievement.UserBadgesResponseDto {
	@Expose()
	@Type(() => UserBadge)
	badges!: UserBadge[];

	@Expose()
	cursor?: string;
}

export class UserBadge extends Badge implements achievement.UserBadges {
	@Expose()
	id!: string;

	@Expose()
	date!: Date;
}
