import { Role } from '../enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const HasRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
