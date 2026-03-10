import {
	CreateExamCommand,
	CreateExamCommandPayload,
} from '../../app/commands/staff/exam.create-exam.command';
import {
	CreateQuestionCommand,
	CreateQuestionCommandPayload,
} from '../../app/commands/staff/exam.create-question.command';
import {
	CreateSectionCommand,
	CreateSectionCommandPayload,
} from '../../app/commands/staff/exam.create-section.command';
import {
	DeleteExamCommand,
	DeleteExamCommandPayload,
} from '../../app/commands/staff/exam.delete-exam.command';
import {
	DeleteQuestionCommand,
	DeleteQuestionCommandPayload,
} from '../../app/commands/staff/exam.delete-question.command';
import {
	DeleteSectionCommand,
	DeleteSectionCommandPayload,
} from '../../app/commands/staff/exam.delete-section.command';
import {
	MoveQuestionCommand,
	MoveQuestionCommandPayload,
} from '../../app/commands/staff/exam.move-question.command';
import {
	MoveSectionCommand,
	MoveSectionCommandPayload,
} from '../../app/commands/staff/exam.move-section.command';
import {
	ReviewExamCommand,
	ReviewExamCommandPayload,
} from '../../app/commands/staff/exam.review-exam.command';
import {
	UpdateExamCommand,
	UpdateExamCommandPayload,
} from '../../app/commands/staff/exam.update-exam.command';
import {
	UpdateQuestionCommand,
	UpdateQuestionCommandPayload,
} from '../../app/commands/staff/exam.update-question.command';
import {
	UpdateSectionCommand,
	UpdateSectionCommandPayload,
} from '../../app/commands/staff/exam.update-section.command';
import { CreateExamDto } from '../dtos/req/management/create-exam.req.dto';
import { CreateQuestionDto } from '../dtos/req/management/create-question.req.dto';
import { CreateSectionDto } from '../dtos/req/management/create-section.req.dto';
import { DeleteExamDto } from '../dtos/req/management/delete-exam.req.dto';
import { DeleteQuestionDto } from '../dtos/req/management/delete-question.req.dto';
import { DeleteSectionDto } from '../dtos/req/management/delete-section.req.dto';
import { MoveQuestionDto } from '../dtos/req/management/move-question.req.dto';
import { MoveSectionDto } from '../dtos/req/management/move-section.req.dto';
import { ReviewExamDto } from '../dtos/req/management/review-exam.req.dto';
import { UpdateExamDto } from '../dtos/req/management/update-exam.req.dto';
import { UpdateQuestionDto } from '../dtos/req/management/update-question.req.dto';
import { UpdateSectionDto } from '../dtos/req/management/update-section.req.dto';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { exam } from '@server/generated';

@exam.ExamManagementServiceControllerMethods()
@Controller()
export class ExamManagementController implements exam.ExamManagementServiceController {
	constructor(private commandBus: CommandBus) {}

	async createExam(@Payload() request: CreateExamDto): Promise<void> {
		await this.commandBus.execute(new CreateExamCommand(new CreateExamCommandPayload(request)));
	}

	async createSection(@Payload() request: CreateSectionDto): Promise<void> {
		await this.commandBus.execute(
			new CreateSectionCommand(new CreateSectionCommandPayload(request)),
		);
	}

	async createQuestion(@Payload() request: CreateQuestionDto): Promise<void> {
		await this.commandBus.execute(
			new CreateQuestionCommand(new CreateQuestionCommandPayload(request.sectionId, request.index)),
		);
	}

	async updateExam(@Payload() request: UpdateExamDto): Promise<void> {
		await this.commandBus.execute(new UpdateExamCommand(new UpdateExamCommandPayload(request)));
	}

	async updateSection(@Payload() request: UpdateSectionDto): Promise<void> {
		await this.commandBus.execute(
			new UpdateSectionCommand(new UpdateSectionCommandPayload(request)),
		);
	}

	async updateQuestion(@Payload() request: UpdateQuestionDto): Promise<void> {
		await this.commandBus.execute(
			new UpdateQuestionCommand(new UpdateQuestionCommandPayload(request)),
		);
	}

	async deleteExam(@Payload() request: DeleteExamDto): Promise<void> {
		await this.commandBus.execute(new DeleteExamCommand(new DeleteExamCommandPayload(request.id)));
	}

	async deleteSection(@Payload() request: DeleteSectionDto): Promise<void> {
		await this.commandBus.execute(
			new DeleteSectionCommand(new DeleteSectionCommandPayload(request.id)),
		);
	}

	async deleteQuestion(@Payload() request: DeleteQuestionDto): Promise<void> {
		await this.commandBus.execute(
			new DeleteQuestionCommand(new DeleteQuestionCommandPayload(request.id)),
		);
	}

	async moveSection(@Payload() request: MoveSectionDto): Promise<void> {
		await this.commandBus.execute(new MoveSectionCommand(new MoveSectionCommandPayload(request)));
	}

	async moveQuestion(@Payload() request: MoveQuestionDto): Promise<void> {
		await this.commandBus.execute(new MoveQuestionCommand(new MoveQuestionCommandPayload(request)));
	}

	async reviewExam(@Payload() request: ReviewExamDto): Promise<void> {
		await this.commandBus.execute(
			new ReviewExamCommand(new ReviewExamCommandPayload(request.id, request.status)),
		);
	}
}
