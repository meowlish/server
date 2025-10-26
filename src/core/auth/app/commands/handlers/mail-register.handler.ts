import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AuthMailRegisterCommand } from '../auth.mail-register.command';

@CommandHandler(AuthMailRegisterCommand)
export class AuthMailRegisterCommandHandler implements ICommandHandler<AuthMailRegisterCommand> {
	public async execute(command: AuthMailRegisterCommand): Promise<string> {
		if (command.payload) {
			console.log(command.payload);
		}
		await Promise.resolve();
		return 'wtf';
	}
}
