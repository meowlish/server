import { TokenService } from '../../services/token.service';
import { ValidateAccessCommand } from '../auth.validate-access.command';
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ValidateAccessCommand)
export class ValidateAccessCommandHandler implements ICommandHandler<ValidateAccessCommand> {
	constructor(private readonly tokenService: TokenService) {}

	public async execute(command: ValidateAccessCommand): Promise<void> {
		const payload = command.payload;
		const isRevoked = await this.tokenService.isTokenRevoked(payload.identityId, payload.iat);
		if (isRevoked) {
			throw new UnauthorizedException('Token has been revoked');
		}
	}
}
