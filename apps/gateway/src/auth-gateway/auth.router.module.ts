import { AuthGatewayController } from './auth.router.controller';
import { AUTH_CLIENT } from './constants/auth';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PackageDefinition } from '@grpc/grpc-js/build/src/make-client';
import { Module } from '@nestjs/common';
import { auth } from '@server/generated';
import { ErrorHandlingGrpcProxy } from '@server/utils';

@Module({
	controllers: [AuthGatewayController],
	providers: [
		{
			provide: AUTH_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					url:
						process.env.AUTH_SERVICE_URL ??
						`${process.env.AUTH_SERVICE_HOST}:${process.env.AUTH_SERVICE_PORT}`,
					package: 'auth',
					packageDefinition: {
						[`auth.${auth.AUTH_SERVICE_NAME}`]: auth.AuthServiceService,
					} satisfies PackageDefinition,
				}),
		},
		JwtRefreshStrategy,
		JwtStrategy,
	],
	exports: [],
})
export class AuthGatewayModule {}
