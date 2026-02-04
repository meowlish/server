import { CursorPaginatedData, OffsetPaginatedData } from '../data/paginated-data.type';
import {
	CursorPaginatedResponseEntity,
	OffsetPaginatedResponseEntity,
	ResponseEntity,
} from '../data/response-entity.type';
import {
	IS_RES_TRANSFORM_KEY,
	ResponseTransformOptions,
} from '../decorators/response-transform.decorator';
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Request, Response } from 'express';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class HttpResponseTransformInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest<Request>();
		const response = context.switchToHttp().getResponse<Response>();

		const transformOptions = this.reflector.getAllAndOverride<ResponseTransformOptions>(
			IS_RES_TRANSFORM_KEY,
			[context.getHandler(), context.getClass()],
		);

		const responseTransformer = <T>(
			data: T,
		): ResponseEntity<T> | OffsetPaginatedResponseEntity<T> | CursorPaginatedResponseEntity<T> => {
			if (transformOptions?.pagination == true) {
				// if paginated data
				const paginatedError = validateSync(plainToInstance(OffsetPaginatedData<any>, data));
				if (!paginatedError.length) {
					const paginatedData = data as OffsetPaginatedData<T>;
					return new OffsetPaginatedResponseEntity<T>(
						request.url,
						response.statusCode,
						paginatedData,
					);
				}
				// if cursor paginated data
				const cursorPaginatedError = validateSync(plainToInstance(CursorPaginatedData<any>, data));
				if (!cursorPaginatedError.length) {
					const cursorPaginatedData = data as CursorPaginatedData<T>;
					return new CursorPaginatedResponseEntity<T>(
						request.url,
						response.statusCode,
						cursorPaginatedData,
					);
				}
				// if nothing matches
				throw new InternalServerErrorException(
					`The 'pagination' options only works with return type of ${OffsetPaginatedData.name} or ${CursorPaginatedData.name}`,
				);
			}

			return new ResponseEntity<T>(request.url, response.statusCode, data);
		};

		const ErrorTransformer = (err: Error) => {
			throw err;
		};

		return next.handle().pipe(map(responseTransformer), catchError(ErrorTransformer));
	}
}
