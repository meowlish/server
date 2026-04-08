import {
	AddNoteCommand,
	AddNoteCommandPayload,
} from '../../app/commands/practice/exam.add-note.command';
import {
	AnswerCommand,
	AnswerCommandPayload,
} from '../../app/commands/practice/exam.answer.command';
import {
	AttemptCommand,
	AttemptCommandPayload,
} from '../../app/commands/practice/exam.attempt.command';
import {
	EndAttemptCommand,
	EndAttemptCommandPayload,
} from '../../app/commands/practice/exam.end-attempt.command';
import {
	RemoveAnswerCommand,
	RemoveAnswerCommandPayload,
} from '../../app/commands/practice/exam.remove-answer.command';
import {
	ToggleFlagCommand,
	ToggleFlagCommandPayload,
} from '../../app/commands/practice/exam.toggle-flag.command';
import { FindExamsQuery } from '../../app/queries/practice/find-exams.query';
import { GetUsersAttemptHistoryQuery } from '../../app/queries/practice/get-users-attempt-history.query';
import {
	type IPracticeReadRepository,
	IPracticeReadRepositoryToken,
} from '../../domain/repositories/practice.read.repository';
import { AddNoteDto } from '../dtos/req/practice/add-note.req.dto';
import { AnswerDto } from '../dtos/req/practice/answer.req.dto';
import { AttemptDto } from '../dtos/req/practice/attempt.req.dto';
import { EndAttemptDto } from '../dtos/req/practice/end-attempt.req.dto';
import { FindExamsDto } from '../dtos/req/practice/find-exams.req.dto';
import { GetUsersAttemptHistoryDto } from '../dtos/req/practice/get-users-attempt-history.req.dto';
import { RemoveAnswerDto } from '../dtos/req/practice/remove-answer.req.dto';
import { ToggleFlagDto } from '../dtos/req/practice/toggle-flag.req.dto';
import { AttemptsHistory } from '../dtos/res/practice/attempts-history.res.dto';
import { CreatedAttemptDto } from '../dtos/res/practice/created-attempt.res.dto';
import { ExamsInfo } from '../dtos/res/practice/exams.res.dto';
import { FlagStateDto } from '../dtos/res/practice/flag-state.res.dto';
import { Controller, Inject, SerializeOptions } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { exam } from '@server/generated';

@exam.ExamPracticeServiceControllerMethods()
@Controller()
export class ExamPracticeController implements exam.ExamPracticeServiceController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		@Inject(IPracticeReadRepositoryToken)
		private readonly praciceReadRepository: IPracticeReadRepository,
	) {}

	@SerializeOptions({ type: CreatedAttemptDto })
	async attempt(@Payload() request: AttemptDto): Promise<CreatedAttemptDto> {
		return await this.commandBus.execute(
			new AttemptCommand(
				new AttemptCommandPayload(request.userId, request.examId, request.options),
			),
		);
	}

	async endAttempt(@Payload() request: EndAttemptDto): Promise<void> {
		await this.commandBus.execute(
			new EndAttemptCommand(new EndAttemptCommandPayload(request.attemptId)),
		);
	}

	async answer(@Payload() request: AnswerDto): Promise<void> {
		await this.commandBus.execute(
			new AnswerCommand(
				new AnswerCommandPayload(request.attemptId, request.questionId, request.answer),
			),
		);
	}

	async removeAnswer(@Payload() request: RemoveAnswerDto): Promise<void> {
		await this.commandBus.execute(
			new RemoveAnswerCommand(
				new RemoveAnswerCommandPayload(request.attemptId, request.questionId, request.answer),
			),
		);
	}

	@SerializeOptions({ type: FlagStateDto })
	async toggleFlag(@Payload() request: ToggleFlagDto): Promise<FlagStateDto> {
		return await this.commandBus.execute(
			new ToggleFlagCommand(new ToggleFlagCommandPayload(request.attemptId, request.questionId)),
		);
	}

	async addNote(@Payload() request: AddNoteDto): Promise<void> {
		await this.commandBus.execute(
			new AddNoteCommand(
				new AddNoteCommandPayload(request.attemptId, request.questionId, request.note),
			),
		);
	}

	// temp
	@SerializeOptions({ type: ExamsInfo, strategy: 'exposeAll' })
	async findExams(@Payload() request: FindExamsDto): Promise<ExamsInfo> {
		return await this.queryBus.execute(new FindExamsQuery(request));
	}

	async getExamDetails(request: exam.GetExamDetailsDto): Promise<exam.DetailedExamInfo> {
		return this.praciceReadRepository.getExamDetail(request.examId);
	}

	async getDetailedQuestionInfo(
		request: exam.GetDetailedQuestionDto,
	): Promise<exam.DetailedQuestionInfo> {
		return this.praciceReadRepository.getDetailedQuestionInfo(request.questionId);
	}

	async getExamStats(request: exam.GetExamStatsDto): Promise<exam.ExamStatistics> {
		return this.praciceReadRepository.getExamStats(request.examId);
	}

	async getAttemptSavedData(request: exam.GetAttemptSavedDataDto): Promise<exam.AttemptSavedData> {
		return this.praciceReadRepository.getAttemptSavedData(request.attemptId);
	}

	async getAttemptReview(
		request: exam.GetAttemptReviewDto,
	): Promise<exam.DetailedAttemptReviewData> {
		return this.praciceReadRepository.getAttemptReview(request.attemptId);
	}

	async getUsersAttemptSummary(
		request: exam.GetUsersAttemptSummaryDto,
	): Promise<exam.AttemptHistorySummary> {
		return {
			history: await this.praciceReadRepository.getUsersAttemptSummary(
				request.uid,
				(request.range as { from: Date; to: Date }) ?? {},
			),
		};
	}

	@SerializeOptions({ type: AttemptsHistory, strategy: 'exposeAll' })
	async getUsersAttemptHistory(
		@Payload() request: GetUsersAttemptHistoryDto,
	): Promise<AttemptsHistory> {
		console.log(request);
		return await this.queryBus.execute(new GetUsersAttemptHistoryQuery(request));
	}

	async getUsesStats(request: exam.GetUserStatsDto): Promise<exam.UserStats> {
		return this.praciceReadRepository.getUserStats(request.uid);
	}
}
