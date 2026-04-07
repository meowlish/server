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
import {
	type IPracticeReadRepository,
	IPracticeReadRepositoryToken,
} from '../../domain/repositories/practice.read.repository';
import { AddNoteDto } from '../dtos/req/practice/add-note.req.dto';
import { AnswerDto } from '../dtos/req/practice/answer.req.dto';
import { AttemptDto } from '../dtos/req/practice/attempt.req.dto';
import { EndAttemptDto } from '../dtos/req/practice/end-attempt.req.dto';
import { RemoveAnswerDto } from '../dtos/req/practice/remove-answer.req.dto';
import { ToggleFlagDto } from '../dtos/req/practice/toggle-flag.req.dto';
import { CreatedAttemptDto } from '../dtos/res/practice/created-attempt.res.dto';
import { FlagStateDto } from '../dtos/res/practice/flag-state.res.dto';
import { Controller, Inject, SerializeOptions } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { exam } from '@server/generated';
import { SortDirection } from '@server/typing';

@exam.ExamPracticeServiceControllerMethods()
@Controller()
export class ExamPracticeController implements exam.ExamPracticeServiceController {
	constructor(
		private readonly commandBus: CommandBus,
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
	async findExam(request: exam.FindExamDto): Promise<exam.Exams> {
		return {
			exams: await this.praciceReadRepository.findExam(
				request as unknown as {
					filter?: { name?: string; tags?: string[] };
					sortBy?: { key: 'attemptsCount' | 'updatedAt'; direction: SortDirection };
				},
			),
		};
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
		return {} as unknown as Promise<exam.ExamStatistics>;
	}

	async getAttemptSavedData(request: exam.GetAttemptSavedDataDto): Promise<exam.AttemptSavedData> {
		return {} as unknown as Promise<exam.AttemptSavedData>;
	}

	async getAttemptReview(
		request: exam.GetAttemptReviewDto,
	): Promise<exam.DetailedAttemptReviewData> {
		return {} as unknown as Promise<exam.DetailedAttemptReviewData>;
	}

	async getUsersAttemptSummary(
		request: exam.GetUsersAttemptSummaryDto,
	): Promise<exam.AttemptHistorySummary> {
		return {} as unknown as Promise<exam.AttemptHistorySummary>;
	}

	async getUsersAttemptHistory(
		request: exam.GetUsersAttemptHistoryDto,
	): Promise<exam.UsersAttemptHistory> {
		return {} as unknown as Promise<exam.UsersAttemptHistory>;
	}

	async getUsesStats(request: exam.GetUserStatsDto): Promise<exam.UserStats> {
		return {} as unknown as Promise<exam.UserStats>;
	}
}
