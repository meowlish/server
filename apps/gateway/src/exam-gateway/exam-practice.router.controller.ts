import { type AuthenticatedRequest } from '../types/authenticated-request';
import { EXAM_CLIENT } from './constants/exam';
import { AddNoteDto } from './dtos/req/practice/add-note.req.dto';
import { AnswerDto } from './dtos/req/practice/answer.req.dto';
import { AttemptDto } from './dtos/req/practice/attempt.req.dto';
import { FindExamsDto } from './dtos/req/practice/find-exams.req.dto';
import { GetUserCalendarDto } from './dtos/req/practice/get-user-calendar.req.dto';
import { GetUsersAttemptHistoryDto } from './dtos/req/practice/get-users-attempt-history.req.dto';
import { RemoveAnswerDto } from './dtos/req/practice/remove-answer.req.dto';
import { AttemptDataDto } from './dtos/res/practice/attempt-data.res.dto';
import { AttemptReviewDto } from './dtos/res/practice/attempt-review.res.dto';
import { AttemptsHistoryDto } from './dtos/res/practice/attempts-history.res.dto';
import { CreatedAttemptDto } from './dtos/res/practice/created-attempt.res.dto';
import { ExamDetailDto } from './dtos/res/practice/exam-detail.res.dto';
import { ExamStatsDto } from './dtos/res/practice/exam-stats.res.dto';
import { ExamsInfoDto } from './dtos/res/practice/exams.res.dto';
import { FlagStateDto } from './dtos/res/practice/flag-state.res.dto';
import { QuestionDetailDto } from './dtos/res/practice/question-detail.res.dto';
import { UserCalendarDto } from './dtos/res/practice/user-calendar.res.dto';
import { UserStatsDto } from './dtos/res/practice/user-stats.res.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	OnModuleInit,
	Param,
	Patch,
	Post,
	Query,
	Req,
	SerializeOptions,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { exam } from '@server/generated';
import { query } from 'winston';

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
	attempt(@Req() req: AuthenticatedRequest, @Param('id') examId: string, @Body() body: AttemptDto) {
		const res = this.examPracticeService.attempt({ ...body, examId: examId, userId: req.user.sub });
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

	@Get()
	@SerializeOptions({ type: ExamsInfoDto, strategy: 'exposeAll' })
	findExams(@Query() query: FindExamsDto) {
		const res = this.examPracticeService.findExams(query);
		return res;
	}

	@Get(':id/details')
	@SerializeOptions({ type: ExamDetailDto, strategy: 'exposeAll' })
	getExamDetails(@Param('id') examId: string) {
		const res = this.examPracticeService.getExamDetails({ examId: examId });
		return res;
	}

	@Get('questions/:id/details')
	@SerializeOptions({ type: QuestionDetailDto, strategy: 'exposeAll' })
	getDetailedQuestionInfo(@Param('id') questionId: string) {
		const res = this.examPracticeService.getDetailedQuestionInfo({ questionId: questionId });
		return res;
	}

	@Get(':id/stats')
	@SerializeOptions({ type: ExamStatsDto, strategy: 'exposeAll' })
	getExamStats(@Param('id') examId: string) {
		const res = this.examPracticeService.getExamStats({ examId: examId });
		return res;
	}

	@Get('attempt/:id/saved')
	@SerializeOptions({ type: AttemptDataDto, strategy: 'exposeAll' })
	getAttemptSavedData(@Param('id') attemptId: string) {
		const res = this.examPracticeService.getAttemptSavedData({ attemptId: attemptId });
		return res;
	}

	@Get('attempt/:id/review')
	@SerializeOptions({ type: AttemptReviewDto, strategy: 'exposeAll' })
	getAttemptReview(@Param('id') attemptId: string) {
		const res = this.examPracticeService.getAttemptReview({ attemptId: attemptId });
		return res;
	}

	@Get('my/calendar')
	@SerializeOptions({ type: UserCalendarDto, strategy: 'exposeAll' })
	getUsersAttemptSummary(@Req() request: AuthenticatedRequest, @Query() query: GetUserCalendarDto) {
		const res = this.examPracticeService.getUsersAttemptSummary({
			uid: request.user.sub,
			...query,
		});
		return res;
	}

	@Get('my/history')
	@SerializeOptions({ type: AttemptsHistoryDto, strategy: 'exposeAll' })
	getUsersAttemptHistory(
		@Req() request: AuthenticatedRequest,
		@Query() query: GetUsersAttemptHistoryDto,
	) {
		const res = this.examPracticeService.getUsersAttemptHistory({
			uid: request.user.sub,
			...query,
		});
		return res;
	}

	@Get('my/stats')
	@SerializeOptions({ type: UserStatsDto, strategy: 'exposeAll' })
	getUsesStats(@Req() request: AuthenticatedRequest) {
		const res = this.examPracticeService.getUsersAttemptHistory({ uid: request.user.sub });
		return res;
	}
}
