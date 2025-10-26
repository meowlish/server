import { AuthMailRegisterCommand } from '@core/auth/app/commands/auth.mail-register.command';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RegisterMailDto } from '../dtos/req/register-mail.req.dto';

@Controller()
export class AuthController {
	constructor(private commandBus: CommandBus) {}

	@MessagePattern({ cmd: 'get_users' })
	get(@Payload() payload: RegisterMailDto) {
		console.log(payload);
		return this.commandBus.execute(new AuthMailRegisterCommand(payload));
	}

	login() {}

	registerMail() {}

	refresh() {}

	/**
	 * defined for passport only
	 */
	googleRedirect() {}

	googleCallback() {}

	/**
	 * validate JWT
	 */
	validate() {}
}
