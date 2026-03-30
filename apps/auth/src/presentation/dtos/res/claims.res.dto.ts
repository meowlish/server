import { auth } from '@server/generated';
import { Permission, Role } from '@server/typing';
import { Expose } from 'class-transformer';

export class ClaimsDto implements auth.Claims {
	@Expose()
	permissions!: Permission[];

	@Expose()
	roles!: Role[];

	@Expose()
	sub!: string;
}
