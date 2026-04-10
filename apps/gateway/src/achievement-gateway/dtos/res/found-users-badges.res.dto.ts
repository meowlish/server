import { BadgeDto } from './found-badges.res.dto';
import { Expose } from 'class-transformer';

export class UserBadgeDto extends BadgeDto {
	@Expose()
	id!: string;

	@Expose()
	date?: Date; // optional because grpc stinks like WHY is message optional???
}

export class FoundUsersBadgesDto {
	@Expose()
	badges!: UserBadgeDto[];

	@Expose()
	cursor?: string;
}
