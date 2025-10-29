import { status } from '@grpc/grpc-js';
import { Catch, ExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';

import { AppLoggerService } from '@shared/logger/logger.service';

@Catch()
export class Any2RpcExceptionFilter implements ExceptionFilter {
	constructor(private readonly logger: AppLoggerService) {}

	catch(exception: Error) {
		this.logger.error(`[${this.constructor.name}] Exception Caught ${exception.message}`, '');

		return throwError(() => ({
			code: status.UNKNOWN,
			message: exception.message,
			details: exception.stack,
		}));
	}
}
