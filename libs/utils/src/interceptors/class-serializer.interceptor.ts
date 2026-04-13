import { ClassSerializerInterceptor, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GlobalClassSerializerInterceptor extends ClassSerializerInterceptor {
	constructor(public override reflector: Reflector) {
		super(reflector, {
			excludeExtraneousValues: true,
			exposeUnsetFields: true,
			enableImplicitConversion: true,
			strategy: 'excludeAll',
		});
	}
}
