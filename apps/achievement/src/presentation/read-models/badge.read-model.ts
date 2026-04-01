import { Expose } from 'class-transformer';

export class Badge {
	@Expose()
	name!: string;

	@Expose()
	displayName!: string;

	@Expose()
	description!: string;
}

export class UserBadge extends Badge {
	@Expose()
	id!: string;

	@Expose()
	date!: Date;
}
