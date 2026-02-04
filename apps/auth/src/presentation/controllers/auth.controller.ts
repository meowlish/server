import { GetClaimsCommand } from '../../app/commands/auth.get-claims.command';
import { MailLoginCommand } from '../../app/commands/auth.mail-login.command';
import { MailRegisterCommand } from '../../app/commands/auth.mail-register.command';
import { RefreshCommand } from '../../app/commands/auth.refresh.command';
import { Tokens } from '../../types/tokens.type';
import { GetClaimsDto } from '../dtos/req/get-claims.req.dto';
import { LoginMailDto } from '../dtos/req/login-mail.req.dto';
import { RegisterMailDto } from '../dtos/req/register-mail.req.dto';
import { Metadata } from '@grpc/grpc-js';
import { Controller, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { auth } from '@server/generated';
import { convertMetadata } from '@server/utils';
import { Claims } from '@server/utils';

@auth.AuthServiceControllerMethods()
@Controller()
export class AuthController implements auth.AuthServiceController {
	constructor(private commandBus: CommandBus) {}

	async loginMail(request: LoginMailDto): Promise<Tokens> {
		const res = await this.commandBus.execute(new MailLoginCommand(request));
		return res;
	}

	async registerMail(request: RegisterMailDto): Promise<Tokens> {
		const res = await this.commandBus.execute(new MailRegisterCommand(request));
		return res;
	}

	async refresh(request: unknown, metadata?: Metadata): Promise<Tokens> {
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
