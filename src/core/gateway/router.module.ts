import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthGatewayModule } from './auth-gateway/auth.router.module';

@Module({
	imports: [
		RouterModule.register([
			{
				path: '/auth',
				module: AuthGatewayModule,
			},
		]),
	],
})
export class RouteModule {}
