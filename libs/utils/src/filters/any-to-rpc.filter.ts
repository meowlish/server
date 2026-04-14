import { RABBIT_CONTEXT_TYPE_KEY } from '@golevelup/nestjs-rabbitmq';
import { status } from '@grpc/grpc-js';
import { ArgumentsHost, Catch, ContextType, ExceptionFilter } from '@nestjs/common';
import { AppLoggerService } from '@server/logger';
import { throwError } from 'rxjs';

@Catch()
export class Any2RpcExceptionFilter implements ExceptionFilter {
	constructor(private readonly logger: AppLoggerService) {}

	catch(exception: Error, host: ArgumentsHost) {
		this.logger.error(
			`[${this.constructor.name}] Exception Caught - ${exception.message}`,
			'',
			exception.stack,
		);

		const contextType = host.getType<ContextType | typeof RABBIT_CONTEXT_TYPE_KEY>();
		if (contextType === RABBIT_CONTEXT_TYPE_KEY) throw exception;

		return throwError(() => ({
			code: status.UNKNOWN,
			message: exception.message,
			details: exception.stack,
		}));
	}
}
