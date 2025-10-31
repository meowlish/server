import { Module } from '@nestjs/common';
import { join } from 'path';

import { AUTH_PACKAGE_NAME } from '@common/generated/auth';
import { ErrorHandlingGrpcProxy } from '@common/utils/classes/grpc-err-proxy.class';

import { AuthGatewayController } from './auth.router.controller';
import { AUTH_CLIENT } from './constants/auth';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	controllers: [AuthGatewayController],
	providers: [
		{
			provide: AUTH_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					package: AUTH_PACKAGE_NAME,
					protoPath: join(process.cwd(), 'proto', 'auth.proto'),
				}),
		},
		JwtRefreshStrategy,
		JwtStrategy,
	],
	exports: [],
})
export class AuthGatewayModule {}
