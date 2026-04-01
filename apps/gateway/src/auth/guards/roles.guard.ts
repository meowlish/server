import { AuthenticatedRequest } from '../../types/authenticated-request';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@server/typing';
import { parseEnum } from '@server/utils';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			return true;
		}

		const rolesRequiredForRoute = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!rolesRequiredForRoute || rolesRequiredForRoute.length == 0) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest<Partial<AuthenticatedRequest>>();
		if (!user) throw new Error('Requires JwtAuthGuard on this route');

		const hasRequiredRoles = rolesRequiredForRoute.some(role =>
			user.roles?.includes(parseEnum(Role, role)),
		);

		if (!hasRequiredRoles) {
			const rolesList = rolesRequiredForRoute.join(', ');
			throw new ForbiddenException(`Access denied. Allowed role(s): ${rolesList}`);
		}

		return hasRequiredRoles;
	}
}
