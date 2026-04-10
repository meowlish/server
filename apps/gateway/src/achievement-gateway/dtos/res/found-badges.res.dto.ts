import { Expose } from 'class-transformer';

export class Badge {
	@Expose()
	name!: string;

	@Expose()
	displayName!: string;

	@Expose()
	description!: string;
}

export class FoundBadgesDto {
	@Expose()
	badges!: Badge[];
}
