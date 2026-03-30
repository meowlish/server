import { type AuthenticatedRequest } from '../types/authenticated-request';
import { EXAM_CLIENT } from './constants/exam';
import { AddNoteDto } from './dtos/req/practice/add-note.req.dto';
import { AnswerDto } from './dtos/req/practice/answer.req.dto';
import { AttemptDto } from './dtos/req/practice/attempt.req.dto';
import { RemoveAnswerDto } from './dtos/req/practice/remove-answer.req.dto';
import { CreatedAttemptDto } from './dtos/res/practice/created-attempt.res.dto';
import { FlagStateDto } from './dtos/res/practice/flag-state.res.dto';
import {
	Body,
	Controller,
	Delete,
	Inject,
	OnModuleInit,
	Param,
	Patch,
	Post,
	Req,
	SerializeOptions,
} from '@nestjs/common';
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

	@Post(':id')
	@SerializeOptions({ type: CreatedAttemptDto })
	attempt(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: AttemptDto) {
		const res = this.examPracticeService.attempt({ ...body, examId: id, userId: req.user.sub });
		return res;
	}

	@Post('attempt/:id/submit')
	endAttempt(@Param('id') id: string) {
		const res = this.examPracticeService.endAttempt({ attemptId: id });
		return res;
	}

	@Post('attempt/:id/answers/:questionId')
	answer(
		@Param('id') id: string,
		@Param('questionId') questionId: string,
		@Body() body: AnswerDto,
	) {
		const res = this.examPracticeService.answer({ ...body, attemptId: id, questionId: questionId });
		return res;
	}

	@Delete('attempt/:id/answers/:questionId')
	removeAnswer(
		@Param('id') id: string,
		@Param('questionId') questionId: string,
		@Body() body: RemoveAnswerDto,
	) {
		const res = this.examPracticeService.removeAnswer({
			...body,
			attemptId: id,
			questionId: questionId,
		});
		return res;
	}

	@Patch('attempt/:id/answers/:questionId/flag')
	@SerializeOptions({ type: FlagStateDto })
	toggleFlag(@Param('id') id: string, @Param('questionId') questionId: string) {
		const res = this.examPracticeService.toggleFlag({
			attemptId: id,
			questionId: questionId,
		});
		return res;
	}

	@Patch('attempt/:id/answers/:questionId/note')
	addNote(
		@Param('id') id: string,
		@Param('questionId') questionId: string,
		@Body() body: AddNoteDto,
	) {
		const res = this.examPracticeService.addNote({
			...body,
			attemptId: id,
			questionId: questionId,
		});
		return res;
	}
}
