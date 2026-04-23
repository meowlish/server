import { RedisIoAdapter } from './app/infra/adaptor/redis-io.adaptor';
import { ChatGateway } from './app/services/chat.gateway';
import { bullConfig } from './configs/bullmq.config';
import { config } from './configs/config';
import { rmqSubConfig } from './configs/rmq.sub.config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PrismaClient } from '@prisma-client/live';
import { DATABASE_SERVICE, DatabaseModule } from '@server/database';
import { LoggerModule } from '@server/logger';
import {
	Any2RpcExceptionFilter,
	GlobalClassSerializerInterceptor,
	GlobalHttpExceptionFilter,
	GlobalValidationPipe,
	GlobalWsExceptionFilter,
	Http2gRPCExceptionFilter,
	HttpExceptionFilter,
} from '@server/utils';
import { ClsGuard, ClsModule } from 'nestjs-cls';

@Module({
	exports: [],
	controllers: [],
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		ClsModule.forRoot({
			global: true,
			guard: { mount: false },
			plugins: [
				new ClsPluginTransactional({
					imports: [DatabaseModule.forRoot(PrismaClient)],
					adapter: new TransactionalAdapterPrisma({
						prismaInjectionToken: DATABASE_SERVICE,
						sqlFlavor: 'postgresql',
					}),
				}),
			],
		}),
		BullModule.forRootAsync({ inject: [ConfigService], useFactory: bullConfig }),
		BullModule.registerQueue({ name: 'live' }),
		RabbitMQModule.forRootAsync({ inject: [ConfigService], useFactory: rmqSubConfig }),
		LoggerModule.forRoot({ appName: 'LiveModule' }),
	],
	providers: [
		ChatGateway,
		GlobalWsExceptionFilter,
		{
			provide: APP_GUARD,
			useClass: ClsGuard,
		},
		{
			provide: APP_FILTER,
			useClass: Any2RpcExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: Http2gRPCExceptionFilter,
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
			provide: APP_PIPE,
			useClass: GlobalValidationPipe,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: GlobalClassSerializerInterceptor,
		},
	],
})
export class LiveModule {}
