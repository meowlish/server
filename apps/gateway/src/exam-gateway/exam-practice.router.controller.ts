import { EXAM_CLIENT } from './constants/exam';
import { AddNoteDto } from './dtos/req/practice/add-note.req.dto';
import { AnswerDto } from './dtos/req/practice/answer.req.dto';
import { AttemptDto } from './dtos/req/practice/attempt.req.dto';
import { EndAttemptDto } from './dtos/req/practice/end-attempt.req.dto';
import { RemoveAnswerDto } from './dtos/req/practice/remove-answer.req.dto';
import { ToggleFlagDto } from './dtos/req/practice/toggle-flag.req.dto';
import { Body, Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { exam } from '@server/generated';

@Controller('practice')
export class ExamPracticeGatewayController implements OnModuleInit {
	private examPracticeService!: exam.ExamPracticeServiceClient;

	constructor(@Inject(EXAM_CLIENT) private readonly examClient: ClientGrpc) {}

	onModuleInit() {
		this.examPracticeService = this.examClient.getService<exam.ExamPracticeServiceClient>(
			exam.EXAM_PRACTICE_SERVICE_NAME,
		);
	}

	attempt(@Body() body: AttemptDto) {
		const res = this.examPracticeService.attempt(body);
		return res;
	}

	endAttempt(@Body() body: EndAttemptDto) {
		const res = this.examPracticeService.endAttempt(body);
		return res;
	}

	answer(@Body() body: AnswerDto) {
		const res = this.examPracticeService.answer(body);
		return res;
	}

	removeAnswer(@Body() body: RemoveAnswerDto) {
		const res = this.examPracticeService.removeAnswer(body);
		return res;
	}

	toggleFlag(@Body() body: ToggleFlagDto) {
		const res = this.examPracticeService.toggleFlag(body);
		return res;
	}

	addNote(@Body() body: AddNoteDto) {
		const res = this.examPracticeService.addNote(body);
		return res;
	}
}
