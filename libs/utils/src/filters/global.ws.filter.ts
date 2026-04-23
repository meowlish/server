import { ArgumentsHost, Catch, ContextType } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { AppLoggerService } from '@server/logger';
import { Socket } from 'socket.io';

@Catch()
export class GlobalWsExceptionFilter extends BaseWsExceptionFilter {
	constructor(private readonly logger: AppLoggerService) {
		super();
	}

	override catch(exception: WsException | Error, host: ArgumentsHost) {
		const contextType = host.getType<ContextType>();
		if (contextType !== 'ws') throw exception;

		const client: Socket = host.switchToWs().getClient();

		const error =
			exception instanceof WsException ?
				JSON.stringify(exception.getError())
			:	(exception.message ?? JSON.stringify(exception));

		this.logger.error(
			`[${this.constructor.name}] Exception Caught - ${error}`,
			'',
			exception.stack,
		);

		client.emit('exception', {
			status: 'error',
			message: error,
		});
	}
}
