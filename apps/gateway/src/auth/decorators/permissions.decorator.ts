import { SetMetadata } from '@nestjs/common';
import { Permission } from '@server/utils';

export const PERMISSIONS_KEY = 'permissions';
export const HasPermissions = (...permissions: Permission[]) =>
	SetMetadata(PERMISSIONS_KEY, permissions);
