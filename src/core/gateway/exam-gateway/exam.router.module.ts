import { Module } from '@nestjs/common';
import { join } from 'path';

import { EXAM_PACKAGE_NAME } from '@common/generated/exam';
import { ErrorHandlingGrpcProxy } from '@common/utils/classes/grpc-err-proxy.class';

import { EXAM_CLIENT } from './constants/exam';
import { ExamGatewayController } from './exam.router.controller';

@Module({
	controllers: [ExamGatewayController],
	providers: [
		{
			provide: EXAM_CLIENT,
			useFactory: () =>
				new ErrorHandlingGrpcProxy({
					url: '0.0.0.0:50050',
					package: EXAM_PACKAGE_NAME,
					protoPath: join(process.cwd(), 'proto', 'exam.proto'),
				}),
		},
	],
	exports: [],
})
export class ExamGatewayModule {}
