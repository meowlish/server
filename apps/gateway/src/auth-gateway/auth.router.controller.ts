import { type AuthenticatedRequest } from '../types/authenticated-request';
import { AUTH_CLIENT } from './constants/auth';
import { LoginMailDto } from './dtos/req/login-mail.req.dto';
import { RegisterMailDto } from './dtos/req/register-mail.req.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { Body, Controller, Inject, OnModuleInit, Post, Req, UseGuards } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { auth } from '@server/generated';
import { IsPublic } from '@server/utils';
import { ResponseTransform } from '@server/utils';
import { createMetadata } from '@server/utils';

@Controller()
export class AuthGatewayController implements OnModuleInit {
	private authService!: auth.AuthServiceClient;

	constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	@Post('register')
	@IsPublic()
	@ResponseTransform()
	register(@Body() body: RegisterMailDto) {
		const res = this.authService.registerMail(body);
		return res;
	}

	@Post('login')
	@IsPublic()
	@ResponseTransform()
	login(@Body() body: LoginMailDto) {
		const res = this.authService.loginMail(body);
		return res;
	}

	@Post('refresh')
	@UseGuards(JwtRefreshAuthGuard)
	refresh(@Req() req: AuthenticatedRequest) {
		const metadata = createMetadata(req.user);
		const res = this.authService.refresh({}, metadata);
		return res;
	}
}
