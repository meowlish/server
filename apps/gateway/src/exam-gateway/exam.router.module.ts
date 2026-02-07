import { JwtAuthGuard } from '../auth-gateway/guards/jwt-auth.guard';
import { EXAM_CLIENT } from './constants/exam';
import { ExamManagementGatewayController } from './exam.router.controller';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ErrorHandlingGrpcProxy } from '@server/utils';
import { join } from 'path';

@Module({
	controllers: [ExamManagementGatewayController],
	providers: [
		{
			provide: EXAM_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					url: '0.0.0.0:50050',
					package: 'exam',
					protoPath: join(process.cwd(), 'proto', 'exam.proto'),
				}),
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [],
})
export class ExamGatewayModule {}
