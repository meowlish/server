import { AuthGatewayModule } from './auth-gateway/auth.router.module';
import { ExamGatewayModule } from './exam-gateway/exam.router.module';
import { FileGatewayModule } from './file-gateway/file.router.module';
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
			{
				path: '/files',
				module: FileGatewayModule,
			},
		]),
	],
})
export class RouteModule {}
