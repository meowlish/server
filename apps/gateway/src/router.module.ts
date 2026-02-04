import { AuthGatewayModule } from './auth-gateway/auth.router.module';
import { ExamGatewayModule } from './exam-gateway/exam.router.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
	imports: [
		RouterModule.register([
			{
				path: '/auth',
				module: AuthGatewayModule,
			},
			{
				path: '/exams',
				module: ExamGatewayModule,
			},
		]),
	],
})
export class RouteModule {}
