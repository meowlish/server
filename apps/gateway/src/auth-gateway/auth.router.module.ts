import { AuthGatewayController } from './auth.router.controller';
import { AUTH_CLIENT } from './constants/auth';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ErrorHandlingGrpcProxy } from '@server/utils';
import { join } from 'path';

@Module({
	controllers: [AuthGatewayController],
	providers: [
		{
			provide: AUTH_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					url: '0.0.0.0:50051',
					package: 'auth',
					protoPath: join(process.cwd(), 'proto', 'auth.proto'),
				}),
		},
		JwtRefreshStrategy,
		JwtStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [],
})
export class AuthGatewayModule {}
