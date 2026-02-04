import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { AppLoggerService } from '@server/logger';
import { Request, Response } from 'express';

import { ResponseEntity } from '../data/response-entity.type';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
	constructor(private readonly logger: AppLoggerService) {}

	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();
		const req = ctx.getRequest<Request>();

		const resolved = this.resolve(exception, req);

		this.logger.error(
			`[${this.constructor.name}] Exception Caught ${req.method} ${req.url} ${exception.message}`,
			'',
			exception.stack,
		);

		return res.status(resolved.statusCode).json(resolved);
	}

	private resolve(exception: unknown, req: Request): ResponseEntity<null> {
		return new ResponseEntity<null>(
			req.url,
			HttpStatus.INTERNAL_SERVER_ERROR,
			null,
			'Internal server error',
		);
	}
}
