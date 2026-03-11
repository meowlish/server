import {
	LogoutAllCommand,
	LogoutAllCommandPayload,
} from '../../app/commands/auth.logout-all.command';
import {
	MailLoginCommand,
	MailLoginCommandPayload,
} from '../../app/commands/auth.mail-login.command';
import {
	MailRegisterCommand,
	MailRegisterCommandPayload,
} from '../../app/commands/auth.mail-register.command';
import { RefreshCommand, RefreshCommandPayload } from '../../app/commands/auth.refresh.command';
import {
	ValidateAccessCommand,
	ValidateAccessCommandPayload,
} from '../../app/commands/auth.validate-access.command';
import {
	ValidateRefreshCommand,
	ValidateRefreshCommandPayload,
} from '../../app/commands/auth.validate-refresh.command';
import { Tokens } from '../../types/tokens.type';
import { LoginMailDto } from '../dtos/req/login-mail.req.dto';
import { LogOutAllDto } from '../dtos/req/logout-all.req.dto';
import { RefreshDto } from '../dtos/req/refresh-dto.req.dto';
import { RegisterMailDto } from '../dtos/req/register-mail.req.dto';
import { ValidateAccessDto } from '../dtos/req/validate-access.req.dto';
import { ValidateRefreshDto } from '../dtos/req/validate-refresh.req.dto';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { auth } from '@server/generated';
import { Claims } from '@server/utils';

@auth.AuthServiceControllerMethods()
@Controller()
export class AuthController implements auth.AuthServiceController {
	constructor(private readonly commandBus: CommandBus) {}

	async loginMail(@Payload() request: LoginMailDto): Promise<Tokens> {
		const res = await this.commandBus.execute(
			new MailLoginCommand(new MailLoginCommandPayload(request.mail, request.password)),
		);
		return res;
	}

	async registerMail(@Payload() request: RegisterMailDto): Promise<Tokens> {
		const res = await this.commandBus.execute(
			new MailRegisterCommand(
				new MailRegisterCommandPayload(request.mail, request.username, request.password),
			),
		);
		return res;
	}

	async refresh(@Payload() request: RefreshDto): Promise<Tokens> {
		const res = await this.commandBus.execute(
			new RefreshCommand(new RefreshCommandPayload(request.identityId)),
		);
		return res;
	}

	async validateRefresh(@Payload() request: ValidateRefreshDto): Promise<Claims> {
		const res = await this.commandBus.execute(
			new ValidateRefreshCommand(
				new ValidateRefreshCommandPayload(request.identityId, request.iat),
			),
		);
		return res;
	}

	async validateAccess(@Payload() request: ValidateAccessDto): Promise<void> {
		await this.commandBus.execute(
			new ValidateAccessCommand(new ValidateAccessCommandPayload(request.identityId, request.iat)),
		);
	}

	async logOutAll(@Payload() request: LogOutAllDto): Promise<void> {
		await this.commandBus.execute(
			new LogoutAllCommand(new LogoutAllCommandPayload(request.identityId)),
		);
	}

	/**
	 * defined for passport only
	 */
	googleRedirect() {
		return;
	}

	googleCallback() {
		return;
	}
}
