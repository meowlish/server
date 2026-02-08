import { AuthenticatedRequest } from '../../types/authenticated-request';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, parseEnum } from '@server/utils';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
	constructor(reflector: Reflector) {
		super(reflector);
	}

	canActivate(context: ExecutionContext): boolean {
		if (!super.canActivate(context)) return false;
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

		const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

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
