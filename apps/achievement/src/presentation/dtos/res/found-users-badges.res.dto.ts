import { Badge } from './found-badges.res.dto';
import { achievement } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class FoundUsersBadgesDto implements achievement.UserBadgesResponseDto {
	@Expose()
	@Type(() => UserBadge)
	badges!: UserBadge[];

	@Expose()
	cursor?: string;

	@Expose()
	limit?: number;
}

export class UserBadge extends Badge {
	@Expose()
	id!: string;

	@Expose()
	date!: Date;
}
