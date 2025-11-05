import { GetClaimsCommand } from '@core/auth/app/commands/auth.get-claims.command';
import { MailLoginCommand } from '@core/auth/app/commands/auth.mail-login.command';
import { MailRegisterCommand } from '@core/auth/app/commands/auth.mail-register.command';
import { RefreshCommand } from '@core/auth/app/commands/auth.refresh.command';
import { Tokens } from '@core/auth/types/tokens.type';
import { Metadata } from '@grpc/grpc-js';
import { Controller, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AuthServiceController, AuthServiceControllerMethods } from '@common/generated/auth';
import { convertMetadata } from '@common/utils/functions/grpc-metadata';
import { Claims } from '@common/utils/types/claims.type';

import { GetClaimsDto } from '../dtos/req/get-claims.req.dto';
import { LoginMailDto } from '../dtos/req/login-mail.req.dto';
import { RegisterMailDto } from '../dtos/req/register-mail.req.dto';

@AuthServiceControllerMethods()
@Controller()
export class AuthController implements AuthServiceController {
	constructor(private commandBus: CommandBus) {}

	async loginMail(request: LoginMailDto): Promise<Tokens> {
		const res = await this.commandBus.execute(new MailLoginCommand(request));
		return res;
	}

	async registerMail(request: RegisterMailDto): Promise<Tokens> {
		const res = await this.commandBus.execute(new MailRegisterCommand(request));
		return res;
	}

	async refresh(request: {}, metadata?: Metadata): Promise<Tokens> {
		const extractedMetadata = metadata ? convertMetadata(metadata) : null;
		if (!extractedMetadata || !extractedMetadata.sub)
			throw new UnauthorizedException('Missing authorization metadata');
		const res = await this.commandBus.execute(
			new RefreshCommand({ identityId: extractedMetadata.sub }),
		);
		return res;
	}

	async getClaims(request: GetClaimsDto): Promise<Claims> {
		const res = await this.commandBus.execute(new GetClaimsCommand(request));
		return res;
	}

	async testRouteForRolesAndPerms() {}

	/**
	 * defined for passport only
	 */
	googleRedirect() {}

	googleCallback() {}
}
