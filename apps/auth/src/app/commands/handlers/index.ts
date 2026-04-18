import { AddGoogleCredCommandHandler } from './add-google-cred.handler';
import { AddMailCredCommandHandler } from './add-mail-cred.handler';
import { GoogleRegisterOrLoginCommandHandler } from './google-register-or-login.handler';
import { LogoutAllCommandHandler } from './logout-all.handler';
import { MailLoginCommandHandler } from './mail-login.handler';
import { MailRegisterCommandHandler } from './mail-register.handler';
import { RefreshCommandHandler } from './refresh.handler';
import { RemoveCredCommandHandler } from './remove-cred.handler';
import { ValidateAccessCommandHandler } from './validate-access.handler';
import { ValidateRefreshCommandHandler } from './validate-refresh.handler';

export const AuthCommandHandlers = [
	MailRegisterCommandHandler,
	MailLoginCommandHandler,
	GoogleRegisterOrLoginCommandHandler,
	AddMailCredCommandHandler,
	AddGoogleCredCommandHandler,
	RemoveCredCommandHandler,
	RefreshCommandHandler,
	ValidateRefreshCommandHandler,
	ValidateAccessCommandHandler,
	LogoutAllCommandHandler,
];
