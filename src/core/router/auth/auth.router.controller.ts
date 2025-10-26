import { RegisterMailDto } from '@core/auth/presentation/dtos/req/register-mail.req.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AuthGatewayController {
	constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

	@Post('register')
	register(@Body() body: RegisterMailDto) {
		return this.authClient.send({ cmd: 'get_users' }, body);
	}
}
