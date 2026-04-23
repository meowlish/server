import { status } from '@grpc/grpc-js';
import { type ArgumentsHost, Catch, type ContextType, ExceptionFilter } from '@nestjs/common';
import { AppLoggerService } from '@server/logger';
import { throwError } from 'rxjs';

@Catch()
export class Any2RpcExceptionFilter implements ExceptionFilter {
	constructor(private readonly logger: AppLoggerService) {}

	catch(exception: Error, host: ArgumentsHost) {
		const contextType = host.getType<ContextType>();
		if (contextType !== 'rpc') throw exception;

		this.logger.error(
			`[${this.constructor.name}] Exception Caught - ${exception.message}`,
			'',
			exception.stack,
		);

		return throwError(() => ({
			code: status.UNKNOWN,
			message: exception.message,
			details: exception.stack,
		}));
	}
}
