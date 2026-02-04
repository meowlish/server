import { Permission } from '../enums/permission.enum';
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const HasPermissions = (...permissions: Permission[]) =>
	SetMetadata(PERMISSIONS_KEY, permissions);
