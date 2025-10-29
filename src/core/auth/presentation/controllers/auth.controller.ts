import { AuthMailRegisterCommand } from '@core/auth/app/commands/auth.mail-register.command';
import { Tokens } from '@core/auth/types/tokens.type';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AuthServiceController, AuthServiceControllerMethods } from '@common/generated/auth';

import { RegisterMailDto } from '../../../gateway/auth-gateway/dtos/req/register-mail.req.dto';

@AuthServiceControllerMethods()
@Controller()
export class AuthController implements AuthServiceController {
	constructor(private commandBus: CommandBus) {}

	login() {}

	async registerMail(request: RegisterMailDto): Promise<Tokens> {
		const res = await this.commandBus.execute(new AuthMailRegisterCommand(request));
		return res;
	}

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
