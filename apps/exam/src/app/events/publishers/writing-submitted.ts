import { WritingSubmittedEvent } from '../../../domain/events/writing-submitted';
import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../domain/repositories/attempt.repository';
import {
	type IGoalRepository,
	IGoalRepositoryToken,
} from '../../../domain/repositories/goal.repository';
import { WritingSubmittedIntegrationEvent } from '../writing-submitted.event';
import { AmqpConnectionManager } from '@golevelup/nestjs-rabbitmq';
import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(WritingSubmittedEvent)
export class WritingSubmittedPublisher implements IEventHandler<WritingSubmittedEvent> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
		@Inject(IGoalRepositoryToken) private readonly goalRepository: IGoalRepository,
		private readonly amqpConnectionManager: AmqpConnectionManager,
		private readonly logger: AppLoggerService,
	) {}

	get amqpConnection() {
		const connection = this.amqpConnectionManager.getConnection('pub');
		if (!connection) throw new InternalServerErrorException('AMQP "pub" connection not available');
		return connection;
	}

	async handle(event: WritingSubmittedEvent) {
		try {
			//not exactly the flow that I'd come up with where we need to include goal and tags and stuff but it wasn't made by me -D
			const response = await this.attemptRepository.getWritingResponse(event.payload.responseId);
			if (!response) throw new NotFoundException('Could not find response');
			const goal = await this.goalRepository.getGoal(response.attemptedBy);

			const message: WritingSubmittedIntegrationEvent = {
				attempt_id: event.payload.attemptId,
				response_id: event.payload.responseId,
				question: response.questionContent,
				content: response.answer ? response.answer.toString() : '',
				exam_type: response.examTags.toString(),
				task_type: response.questionTags.toString(),
				target_score: goal?.target ?? 0, // need to map from tag?
			};
			await this.amqpConnection.publish('eventbus', 'exam.writing.submitted', message, {
				persistent: true,
			});
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
