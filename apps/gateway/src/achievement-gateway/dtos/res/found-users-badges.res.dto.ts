import { Badge } from './found-badges.res.dto';
import { Expose } from 'class-transformer';

export class UserBadge extends Badge {
	@Expose()
	id!: string;

	@Expose()
	date?: Date; // optional because grpc stinks like WHY is message optional???
}

export class FoundUsersBadgesDto {
	@Expose()
	badges!: UserBadge[];

	@Expose()
	cursor?: string;
}
