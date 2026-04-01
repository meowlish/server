import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';

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
	@Type(() => Badge)
	badges!: Badge[];
}
