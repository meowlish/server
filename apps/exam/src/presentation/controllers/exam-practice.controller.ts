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
import { AddNoteDto } from '../dtos/req/practice/add-note.req.dto';
import { AnswerDto } from '../dtos/req/practice/answer.req.dto';
import { AttemptDto } from '../dtos/req/practice/attempt.req.dto';
import { EndAttemptDto } from '../dtos/req/practice/end-attempt.req.dto';
import { RemoveAnswerDto } from '../dtos/req/practice/remove-answer.req.dto';
import { ToggleFlagDto } from '../dtos/req/practice/toggle-flag.req.dto';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { exam } from '@server/generated';

@exam.ExamPracticeServiceControllerMethods()
@Controller()
export class ExamController implements exam.ExamPracticeServiceController {
	constructor(private commandBus: CommandBus) {}

	async attempt(@Payload() request: AttemptDto): Promise<void> {
		await this.commandBus.execute(
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

	async toggleFlag(@Payload() request: ToggleFlagDto): Promise<void> {
		await this.commandBus.execute(
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
}
