import { EXAM_CLIENT } from './constants/exam';
import { ExamManagementGatewayController } from './exam-management.router.controller';
import { ExamPracticeGatewayController } from './exam-practice.router.controller';
import { TagGatewayController } from './tag.router.controller';
import { PackageDefinition } from '@grpc/grpc-js/build/src/make-client';
import { Module } from '@nestjs/common';
import { exam } from '@server/generated';
import { ErrorHandlingGrpcProxy } from '@server/utils';

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
					packageDefinition: {
						[`exam.${exam.EXAM_MANAGEMENT_SERVICE_NAME}`]: exam.ExamManagementServiceService,
						[`exam.${exam.EXAM_PRACTICE_SERVICE_NAME}`]: exam.ExamPracticeServiceService,
						[`exam.${exam.TAG_SERVICE_NAME}`]: exam.TagServiceService,
						[`exam.${exam.GOAL_SERVICE_NAME}`]: exam.GoalServiceService,
					} satisfies PackageDefinition,
				}),
		},
	],
	exports: [],
})
export class ExamGatewayModule {}
