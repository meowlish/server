import { ResponseEntity } from '../data';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class HttpResponseTransformInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<ResponseEntity<any>> | Promise<Observable<ResponseEntity<any>>> {
		const request = context.switchToHttp().getRequest<Request>();
		const response = context.switchToHttp().getResponse<Response>();
		const statusCode = response.statusCode;

		const responseTransformer = <T>(data: T): ResponseEntity<T> => {
			return new ResponseEntity<T>({
				path: request.url,
				statusCode: statusCode,
				success: true,
				timestamp: Date.now(),
				data: data,
			});
		};

		const errorTransformer = (err: Error) => {
			throw err;
		};

		return next.handle().pipe(map(responseTransformer), catchError(errorTransformer));
	}
}
