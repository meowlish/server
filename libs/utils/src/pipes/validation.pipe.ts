import { ValidationPipe } from '@nestjs/common';

export class GlobalValidationPipe extends ValidationPipe {
	constructor() {
		super({
			whitelist: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
			transform: true,
			transformOptions: {
				excludeExtraneousValues: true,
				exposeUnsetFields: false,
			},
		});
	}
}
