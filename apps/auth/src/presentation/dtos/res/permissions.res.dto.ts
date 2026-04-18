import { auth } from '@server/generated';
import { Expose } from 'class-transformer';

export class PermissionsDto implements auth.PermList {
	@Expose()
	perms!: string[];
}
