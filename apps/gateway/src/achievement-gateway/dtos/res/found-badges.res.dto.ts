import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class BadgeDto {
	@Expose()
	@ApiProperty()
	name!: string;

	@Expose()
	@ApiProperty()
	displayName!: string;

	@Expose()
	@ApiProperty()
	description!: string;
}

export class FoundBadgesDto {
	@Expose()
	@Type(() => BadgeDto)
	@ApiProperty({ type: () => [BadgeDto] })
	badges!: BadgeDto[];
}
