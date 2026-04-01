import { Badge } from '../../read-models/badge.read-model';
import { achievement } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class FoundBadgesDto implements achievement.BadgesResponseDto {
	@Expose()
	@Type(() => Badge)
	badges!: Badge[];
}
