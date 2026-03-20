import { ValidationPipe } from '@nestjs/common';

export class GlobalValidationPipe extends ValidationPipe {
	constructor() {
		super({
			whitelist: true,
			forbidUnknownValues: true,
			transform: true,
			transformOptions: {
				exposeUnsetFields: false,
			},
		});
	}
}
