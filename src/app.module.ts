import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { GlobalValidationPipe } from '@common/pipes/validation.pipe';

import { DatabaseModule } from '@shared/db/database.module';
import { LoggerModule } from '@shared/logger/logger.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './configs/config';
import { AuthGatewayModule } from './core/router/auth/auth.router.module';
import { RouteModule } from './core/router/router.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		CqrsModule.forRoot(),
		DatabaseModule,
		LoggerModule,
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
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: GlobalValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
