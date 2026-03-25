import { FileService } from './app/services/file.service';
import { config } from './configs/config';
import { minioConfig } from './configs/minio.config';
import { IFileRepositoryToken } from './domain/repositories/file.repository';
import { FilePrismaRepository } from './infra/repositories/file.prisma.repository.impl';
import { FileController } from './presentation/controllers/file.controller';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PrismaClient } from '@prisma-client/file';
import { DATABASE_SERVICE, DatabaseModule } from '@server/database';
import { LoggerModule } from '@server/logger';
import {
	Any2RpcExceptionFilter,
	GlobalClassSerializerInterceptor,
	GlobalValidationPipe,
	Http2gRPCExceptionFilter,
} from '@server/utils';
import { ClsGuard, ClsModule } from 'nestjs-cls';
import { NestMinioModule } from 'nestjs-minio';

@Module({
	controllers: [FileController],
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
		NestMinioModule.registerAsync({ inject: [ConfigService], useFactory: minioConfig }),
		LoggerModule.forRoot({ appName: 'FileModule' }),
	],
	providers: [
		FileService,
		{
			provide: IFileRepositoryToken,
			useClass: FilePrismaRepository,
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
		{
			provide: APP_INTERCEPTOR,
			useClass: GlobalClassSerializerInterceptor,
		},
	],
})
export class FileModule {}
