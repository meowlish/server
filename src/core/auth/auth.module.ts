import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ClsGuard, ClsModule } from 'nestjs-cls';

import { Any2RpcExceptionFilter } from '@common/filters/any-to-rpc.filter';
import { Http2gRPCExceptionFilter } from '@common/filters/http-to-rpc.filter';
import { GlobalValidationPipe } from '@common/pipes/validation.pipe';

import { IEnvVars, config } from '@configs/config';
import JwtRefreshConfig from '@configs/jwt-refresh.config';
import JwtAccessConfig from '@configs/jwt.config';

import { DatabaseModule } from '@shared/db/database.module';
import { DatabaseService } from '@shared/db/database.service';
import { LoggerModule } from '@shared/logger/logger.module';

import { AuthHandlers } from './app/commands/handlers';
import { TokenService } from './app/services/token.service';
import { ICredentialRepositoryToken } from './domain/repositories/credential.repository';
import { IIdentityRepositoryToken } from './domain/repositories/identity.repository';
import {
	CredentialPrismaMapper,
	CredentialPrismaRepository,
} from './infra/repositories/credential.prisma.repository.impl';
import {
	IdentityPrismaMapper,
	IdentityPrismaRepository,
} from './infra/repositories/identity.prisma.repository';
import { AuthController } from './presentation/controllers';

@Module({
	controllers: [AuthController],
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			cache: true,
			isGlobal: true,
			load: [config],
		}),
		CqrsModule.forRoot(),
		DatabaseModule,
		ClsModule.forRoot({
			global: true,
			guard: { mount: false },
			plugins: [
				new ClsPluginTransactional({
					imports: [DatabaseModule],
					adapter: new TransactionalAdapterPrisma({
						prismaInjectionToken: DatabaseService,
						sqlFlavor: 'postgresql',
					}),
				}),
			],
		}),
		LoggerModule.forRoot({ appName: 'AuthModule' }),
	],
	providers: [
		DatabaseService,
		TokenService,
		...AuthHandlers,
		{
			inject: [ConfigService],
			provide: 'JWT_ACCESS_TOKEN',
			useFactory: (configService: ConfigService<IEnvVars>) => {
				const config = JwtAccessConfig(configService);
				return new JwtService(config);
			},
		},
		{
			inject: [ConfigService],
			provide: 'JWT_REFRESH_TOKEN',
			useFactory: (configService: ConfigService<IEnvVars>) => {
				const config = JwtRefreshConfig(configService);
				return new JwtService(config);
			},
		},
		CredentialPrismaMapper,
		{
			provide: ICredentialRepositoryToken,
			useClass: CredentialPrismaRepository,
		},
		IdentityPrismaMapper,
		{
			provide: IIdentityRepositoryToken,
			useClass: IdentityPrismaRepository,
		},
		{
			provide: APP_GUARD,
			useClass: ClsGuard,
		},
		{
			provide: APP_FILTER,
			useClass: Http2gRPCExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: Any2RpcExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: GlobalValidationPipe,
		},
	],
})
export class AuthModule {}
