import { Expose } from 'class-transformer';

export class BadgeDto {
	@Expose()
	name!: string;

	@Expose()
	displayName!: string;

	@Expose()
	description!: string;
}

export class FoundBadgesDto {
	@Expose()
	badges!: BadgeDto[];
}
