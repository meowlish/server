import { ArgumentsHost, Catch, ContextType } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { AppLoggerService } from '@server/logger';
import { Socket } from 'socket.io';

@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
	constructor(private readonly logger: AppLoggerService) {
		super();
	}

	override catch(exception: WsException, host: ArgumentsHost) {
		const contextType = host.getType<ContextType>();
		if (contextType !== 'ws') throw exception;

		const client: Socket = host.switchToWs().getClient();

		const error = exception.getError();

		this.logger.error(
			`[${this.constructor.name}] Exception Caught - ${exception.message}`,
			'',
			exception.stack,
		);

		client.send('exception', {
			status: 'error',
			message: error,
		});
	}
}
