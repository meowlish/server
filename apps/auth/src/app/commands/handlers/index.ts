import { LogoutAllCommandHandler } from './logout-all.handler';
import { MailLoginCommandHandler } from './mail-login.handler';
import { MailRegisterCommandHandler } from './mail-register.handler';
import { RefreshCommandHandler } from './refresh.handler';
import { ValidateAccessCommandHandler } from './validate-access.handler';
import { ValidateRefreshCommandHandler } from './validate-refresh.handler';

export const AuthHandlers = [
	MailRegisterCommandHandler,
	MailLoginCommandHandler,
	RefreshCommandHandler,
	ValidateRefreshCommandHandler,
	ValidateAccessCommandHandler,
	LogoutAllCommandHandler,
];
