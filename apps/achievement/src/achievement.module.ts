import { IntegrationEventHandlers } from './app/events/handlers';
import { config } from './configs/config';
import { rmqConfig } from './configs/rmq.config';
import { IBadgeManagerRepositoryToken } from './domain/repositories/badge-manager.repository';
import {
	BadgeManagerPrismaMapper,
	BadgeManagerPrismaRepositoryImpl,
} from './infra/repositories/badge-manager.prisma.repository.impl';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma-client/achievement';
import { DATABASE_SERVICE, DatabaseModule } from '@server/database';
import { LoggerModule } from '@server/logger';
import {
	Any2RpcExceptionFilter,
	GlobalValidationPipe,
	Http2gRPCExceptionFilter,
} from '@server/utils';
import { ClsGuard, ClsModule } from 'nestjs-cls';

@Module({
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		CqrsModule.forRoot(),
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
		RabbitMQModule.forRootAsync({ inject: [ConfigService], useFactory: rmqConfig }),
		LoggerModule.forRoot({ appName: 'AchievementModule' }),
	],
	providers: [
		...IntegrationEventHandlers,
		BadgeManagerPrismaMapper,
		{
			provide: IBadgeManagerRepositoryToken,
			useClass: BadgeManagerPrismaRepositoryImpl,
		},
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
			provide: APP_PIPE,
			useClass: GlobalValidationPipe,
		},
	],
})
export class AchievementModule {}
