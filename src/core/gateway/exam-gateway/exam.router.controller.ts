import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';

import { IsPublic } from '@common/decorators/public.decorator';
import { ResponseTransform } from '@common/decorators/response-transform.decorator';
import { EXAM_SERVICE_NAME, ExamServiceClient } from '@common/generated/exam';

import { EXAM_CLIENT } from './constants/exam';

@Controller()
export class ExamGatewayController implements OnModuleInit {
	private examService!: ExamServiceClient;

	constructor(@Inject(EXAM_CLIENT) private readonly examClient: ClientGrpc) {}

	onModuleInit() {
		this.examService = this.examClient.getService<ExamServiceClient>(EXAM_SERVICE_NAME);
	}

	@Get('test')
	@IsPublic()
	@ResponseTransform()
	test() {
		return this.examService.test({});
	}
}
