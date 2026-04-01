import { Badge } from './found-badges.res.dto';
import { Expose, Type } from 'class-transformer';

export class UserBadge extends Badge {
	@Expose()
	id!: string;

	@Expose()
	date?: Date; // optional because grpc stinks like WHY is message optional???
}

export class FoundUsersBadgesDto {
	@Expose()
	@Type(() => UserBadge)
	badges!: UserBadge[];

	@Expose()
	cursor?: string;

	@Expose()
	limit?: number;
}
