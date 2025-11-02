import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { GlobalHttpExceptionFilter } from '@common/filters/global.http.filter';
import { HttpExceptionFilter } from '@common/filters/http-exception.http.filter';
import { HttpResponseTransformInterceptor } from '@common/interceptors/res-transform.http.interceptor';
import { GlobalValidationPipe } from '@common/pipes/validation.pipe';

import { LoggerModule } from '@shared/logger/logger.module';

import { config } from '../../configs/config';
import { AuthGatewayModule } from './auth-gateway/auth.router.module';
import { ExamGatewayModule } from './exam-gateway/exam.router.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { RouteModule } from './router.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		CqrsModule.forRoot(),
		LoggerModule.forRoot({ appName: 'GatewayModule' }),
		ThrottlerModule.forRoot({
			throttlers: [
				{
					ttl: 60000,
					limit: 60,
				},
			],
			errorMessage: 'Rate limit reached',
		}),
		RouteModule,
		AuthGatewayModule,
		ExamGatewayModule,
	],
	controllers: [GatewayController],
	providers: [
		GatewayService,
		{
			provide: APP_PIPE,
			useClass: GlobalValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},

		{
			provide: APP_FILTER,
			useClass: GlobalHttpExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: HttpResponseTransformInterceptor,
		},
	],
})
export class GatewayModule {}
