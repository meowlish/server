import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthGatewayModule } from './auth-gateway/auth.router.module';
import { ExamGatewayModule } from './exam-gateway/exam.router.module';

@Module({
	imports: [
		RouterModule.register([
			{
				path: '/auth',
				module: AuthGatewayModule,
			},
			{
				path: '/exam',
				module: ExamGatewayModule,
			},
		]),
	],
})
export class RouteModule {}
