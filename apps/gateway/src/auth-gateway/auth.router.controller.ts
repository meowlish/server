import { type AuthenticatedRequest } from '../types/authenticated-request';
import { AUTH_CLIENT } from './constants/auth';
import { LoginMailDto } from './dtos/req/login-mail.req.dto';
import { RegisterMailDto } from './dtos/req/register-mail.req.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { Body, Controller, Inject, OnModuleInit, Post, Req, UseGuards } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { auth } from '@server/generated';
import { IsPublic } from '@server/utils';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AuthGatewayController implements OnModuleInit {
	private authService!: auth.AuthServiceClient;

	constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	@Post('register')
	@IsPublic()
	register(@Body() body: RegisterMailDto) {
		const res = this.authService.registerMail(body);
		return res;
	}

	@Post('login')
	@IsPublic()
	login(@Body() body: LoginMailDto) {
		const res = this.authService.loginMail(body);
		return res;
	}

	@Post('refresh')
	@UseGuards(JwtRefreshAuthGuard)
	@IsPublic()
	refresh(@Req() req: AuthenticatedRequest) {
		const res = this.authService.refresh({ identityId: req.user.sub });
		return res;
	}

	@Post('logout-all')
	async logoutAll(@Req() req: AuthenticatedRequest) {
		await lastValueFrom(this.authService.logOutAll({ identityId: req.user.sub }));
		return null;
	}
}
