import { RegisterMailDto } from '@core/gateway/auth-gateway/dtos/req/register-mail.req.dto';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import { ResponseTransform } from '@common/decorators/response-transform.decorator';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@common/generated/auth';

import { AUTH_CLIENT } from './constants/auth';

@Controller()
export class AuthGatewayController implements OnModuleInit {
	private authService!: AuthServiceClient;

	constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
	}

	@Post('register')
	@ResponseTransform()
	register(@Body() body: RegisterMailDto) {
		const res = this.authService.registerMail(body);
		return res;
	}
}
