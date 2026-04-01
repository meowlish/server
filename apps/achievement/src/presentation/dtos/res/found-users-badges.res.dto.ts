import { UserBadge } from '../../read-models/badge.read-model';
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
