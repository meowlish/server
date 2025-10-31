import { AuthGetClaimsCommandHandler } from './get-claims.handler';
import { AuthMailLoginCommandHandler } from './mail-login.handler';
import { AuthMailRegisterCommandHandler } from './mail-register.handler';
import { AuthRefreshCommandHandler } from './refresh.handler';

export const AuthHandlers = [
	AuthMailRegisterCommandHandler,
	AuthMailLoginCommandHandler,
	AuthRefreshCommandHandler,
	AuthGetClaimsCommandHandler,
];
