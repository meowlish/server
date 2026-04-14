import { TokenService } from '../../services/token.service';
import { LogoutAllCommand } from '../auth.logout-all.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LogoutAllCommand)
export class LogoutAllCommandHandler implements ICommandHandler<LogoutAllCommand> {
	constructor(private readonly tokenService: TokenService) {}

	public async execute(command: LogoutAllCommand): Promise<void> {
		const payload = command.payload;
		await this.tokenService.revokeUser(payload.identityId);
	}
}
