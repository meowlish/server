import { AuthenticatedRequest } from '../../types/authenticated-request';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '@server/typing';
import { parseEnum } from '@server/utils';

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			return true;
		}

		const permissionsRequiredForRoute = this.reflector.getAllAndOverride<string[]>(
			PERMISSIONS_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (!permissionsRequiredForRoute || permissionsRequiredForRoute.length === 0) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest<Partial<AuthenticatedRequest>>();
		if (!user) throw new Error('Requires JwtAuthGuard on this route');

		const hasRequiredPermissions = permissionsRequiredForRoute.some(permission =>
			user.permissions?.includes(parseEnum(Permission, permission)),
		);

		if (!hasRequiredPermissions) {
			const permissionsList = permissionsRequiredForRoute.join(', ');
			throw new ForbiddenException(`Access denied. Allowed permission(s): ${permissionsList}`);
		}

		return hasRequiredPermissions;
	}
}
