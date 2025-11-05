import { GetClaimsCommandHandler } from './get-claims.handler';
import { MailLoginCommandHandler } from './mail-login.handler';
import { MailRegisterCommandHandler } from './mail-register.handler';
import { RefreshCommandHandler } from './refresh.handler';

export const AuthHandlers = [
	MailRegisterCommandHandler,
	MailLoginCommandHandler,
	RefreshCommandHandler,
	GetClaimsCommandHandler,
];
