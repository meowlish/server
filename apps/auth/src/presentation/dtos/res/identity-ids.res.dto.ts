import { auth } from '@server/generated';
import { Expose } from 'class-transformer';

export class IdentityIdsDto implements auth.IdentityIds {
	@Expose()
	cursor!: string;

	@Expose()
	ids!: string[];
}
