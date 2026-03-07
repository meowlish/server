import { EXAM_CLIENT } from './constants/exam';
import { ExamManagementGatewayController } from './exam-management.router.controller';
import { ExamPracticeGatewayController } from './exam-practice.router.controller';
import { Module } from '@nestjs/common';
import { ErrorHandlingGrpcProxy } from '@server/utils';
import { join } from 'path';

@Module({
	controllers: [ExamManagementGatewayController, ExamPracticeGatewayController],
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
	],
	exports: [],
})
export class ExamGatewayModule {}
