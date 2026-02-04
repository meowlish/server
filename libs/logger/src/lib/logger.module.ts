import { AppLoggerService } from './logger.service';
import { createWinstonLogger } from './winston.logger';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class LoggerModule {
	static forRoot(options?: { appName?: string }): DynamicModule {
		const winstonProvider = {
			provide: 'winston',
			useValue: createWinstonLogger(options?.appName || 'MyApp'),
		};

		return {
			module: LoggerModule,
			providers: [AppLoggerService, winstonProvider],
			exports: [AppLoggerService],
		};
	}
}
