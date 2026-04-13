import { BadgeDto } from './found-badges.res.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserBadgeDto extends BadgeDto {
	@Expose()
	@ApiProperty()
	id!: string;

	@Expose()
	@ApiPropertyOptional({ type: String, format: 'date-time' })
	date?: Date; // optional because grpc stinks like WHY is message optional???
}

export class FoundUsersBadgesDto {
	@Expose()
	@ApiProperty({ type: () => [UserBadgeDto] })
	badges!: UserBadgeDto[];

	@Expose()
	@ApiPropertyOptional()
	cursor?: string;
}
