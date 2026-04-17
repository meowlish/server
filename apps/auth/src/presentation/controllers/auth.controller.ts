import { AddGoogleCredCommand } from '../../app/commands/auth.add-google-cred.command';
import { GoogleRegisterOrLoginCommand } from '../../app/commands/auth.google-register-or-login.command';
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
import { AddGoogleCredDto } from '../dtos/req/add-google-cred.req.dto';
import { LoginMailDto } from '../dtos/req/login-mail.req.dto';
import { LogOutAllDto } from '../dtos/req/logout-all.req.dto';
import { RefreshDto } from '../dtos/req/refresh-dto.req.dto';
import { RegisterMailDto } from '../dtos/req/register-mail.req.dto';
import { RegisterOrLoginGoogleDto } from '../dtos/req/register-or-login-google.req.dto';
import { ValidateAccessDto } from '../dtos/req/validate-access.req.dto';
import { ValidateRefreshDto } from '../dtos/req/validate-refresh.req.dto';
import { ClaimsDto } from '../dtos/res/claims.res.dto';
import { TokensDto } from '../dtos/res/tokens.res.dto';
import { Metadata } from '@grpc/grpc-js';
import { Controller, SerializeOptions } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { auth } from '@server/generated';
import { Observable } from 'rxjs';

@auth.AuthServiceControllerMethods()
@Controller()
export class AuthController implements auth.AuthServiceController {
	constructor(private readonly commandBus: CommandBus) {}

	@SerializeOptions({ type: TokensDto })
	async loginMail(@Payload() request: LoginMailDto): Promise<TokensDto> {
		const res = await this.commandBus.execute(
			new MailLoginCommand(new MailLoginCommandPayload(request.mail, request.password)),
		);
		return res;
	}

	@SerializeOptions({ type: TokensDto })
	async registerMail(@Payload() request: RegisterMailDto): Promise<TokensDto> {
		const res = await this.commandBus.execute(
			new MailRegisterCommand(
				new MailRegisterCommandPayload(request.mail, request.username, request.password),
			),
		);
		return res;
	}

	@SerializeOptions({ type: TokensDto })
	async refresh(@Payload() request: RefreshDto): Promise<TokensDto> {
		const res = await this.commandBus.execute(
			new RefreshCommand(new RefreshCommandPayload(request.identityId)),
		);
		return res;
	}

	@SerializeOptions({ type: ClaimsDto })
	async validateRefresh(@Payload() request: ValidateRefreshDto): Promise<ClaimsDto> {
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

	@SerializeOptions({ type: TokensDto })
	async registerOrLoginGoogle(@Payload() request: RegisterOrLoginGoogleDto): Promise<TokensDto> {
		return await this.commandBus.execute(new GoogleRegisterOrLoginCommand(request));
	}

	async addGoogleCredential(request: AddGoogleCredDto): Promise<void> {
		await this.commandBus.execute(new AddGoogleCredCommand(request));
	}

	removeGoogleCredential(request: auth.RemoveGoogleCredDto): void | Promise<void> {
		return;
	}

	addMailCredential(request: auth.AddMailCredDto): void | Promise<void> {
		return;
	}

	removeMailCredential(request: auth.RemoveMailCredDto): void | Promise<void> {
		return;
	}

	assignRoleTo(request: auth.AssignRoleToDto): void | Promise<void> {
		return;
	}

	removeRoleFrom(request: auth.RemoveRoleFromDto): void | Promise<void> {
		return;
	}

	findIdentities(
		request: auth.FindIdentitiesDto,
	): Promise<auth.Identities> | Observable<auth.Identities> | auth.Identities {
		return {} as auth.Identities;
	}

	findIdentityIds(
		request: auth.FindIdentityIdsDto,
	): Promise<auth.IdentityIds> | Observable<auth.IdentityIds> | auth.IdentityIds {
		return {} as auth.IdentityIds;
	}

	getRoleList(): Promise<auth.RoleList> | Observable<auth.RoleList> | auth.RoleList {
		return {} as auth.RoleList;
	}

	getPermList(): Promise<auth.PermList> | Observable<auth.PermList> | auth.PermList {
		return {} as auth.PermList;
	}

	updateIdentity(request: auth.UpdateIdentityDto): void | Promise<void> {
		return;
	}
}
