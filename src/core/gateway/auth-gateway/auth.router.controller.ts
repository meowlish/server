import { RegisterMailDto } from '@core/gateway/auth-gateway/dtos/req/register-mail.req.dto';
import { Body, Controller, Inject, OnModuleInit, Post, Req, UseGuards } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';

import { IsPublic } from '@common/decorators/public.decorator';
import { ResponseTransform } from '@common/decorators/response-transform.decorator';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@common/generated/auth';
import { createMetadata } from '@common/utils/functions/grpc-metadata';

import { type AuthenticatedRequest } from '../types/authenticated-request';
import { AUTH_CLIENT } from './constants/auth';
import { LoginMailDto } from './dtos/req/login-mail.req.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller()
export class AuthGatewayController implements OnModuleInit {
	private authService!: AuthServiceClient;

	constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
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
