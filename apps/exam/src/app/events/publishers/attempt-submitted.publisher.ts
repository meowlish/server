import { AttemptSubmittedEvent } from '../../../domain/events/attempt.event';
import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../domain/repositories/attempt.repository';
import { AttemptSubmittedIntegrationEvent } from '../attempt-submitted.event';
import { AmqpConnectionManager } from '@golevelup/nestjs-rabbitmq';
import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(AttemptSubmittedEvent)
export class AttemptSubmittedPublisher implements IEventHandler<AttemptSubmittedEvent> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
		private readonly amqpConnectionManager: AmqpConnectionManager,
		private readonly logger: AppLoggerService,
	) {}

	get amqpConnection() {
		const connection = this.amqpConnectionManager.getConnection('pub');
		if (!connection) throw new InternalServerErrorException('AMQP "pub" connection not available');
		return connection;
	}

	async handle(event: AttemptSubmittedEvent) {
		try {
			const attemptedBy = await this.attemptRepository.getAttemptedUser(event.payload.attemptId);
			if (!attemptedBy) throw new NotFoundException('Could not find user for the attempt');

			const message: AttemptSubmittedIntegrationEvent = {
				attemptId: event.payload.attemptId,
				attemptedBy: attemptedBy,
			};
			await this.amqpConnection.publish('eventbus', 'exam.attempt.submitted', message, {
				persistent: true,
			});
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
