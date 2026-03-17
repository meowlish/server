import { AuthGatewayController } from './auth.router.controller';
import { AUTH_CLIENT } from './constants/auth';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { ErrorHandlingGrpcProxy } from '@server/utils';
import { join } from 'path';

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
					protoPath: join(process.cwd(), 'proto', 'auth.proto'),
				}),
		},
		JwtRefreshStrategy,
		JwtStrategy,
	],
	exports: [],
})
export class AuthGatewayModule {}
