import { EXAM_CLIENT } from './constants/exam';
import { ExamManagementGatewayController } from './exam-management.router.controller';
import { ExamPracticeGatewayController } from './exam-practice.router.controller';
import { TagGatewayController } from './tag.router.controller';
import { Module } from '@nestjs/common';
import { ErrorHandlingGrpcProxy } from '@server/utils';
import { join } from 'path';

@Module({
	controllers: [
		ExamManagementGatewayController,
		ExamPracticeGatewayController,
		TagGatewayController,
	],
	providers: [
		{
			provide: EXAM_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					url:
						process.env.EXAM_SERVICE_URL ??
						`${process.env.EXAM_SERVICE_HOST}:${process.env.EXAM_SERVICE_PORT}`,
					package: 'exam',
					protoPath: join(process.cwd(), 'proto', 'exam.proto'),
				}),
		},
	],
	exports: [],
})
export class ExamGatewayModule {}
