import { AttemptScoredEvent } from '../../../domain/events/attempt.event';
import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../domain/repositories/attempt.repository';
import { AttemptScoredIntegrationEvent } from '../attempt-scored.event';
import { AmqpConnectionManager } from '@golevelup/nestjs-rabbitmq';
import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(AttemptScoredEvent)
export class AttemptScoredPublisher implements IEventHandler<AttemptScoredEvent> {
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

	async handle(event: AttemptScoredEvent) {
		try {
			const attemptedBy = await this.attemptRepository.getAttemptedUser(event.payload.attemptId);
			if (!attemptedBy) throw new NotFoundException('Could not find user for the attempt');

			const message: AttemptScoredIntegrationEvent = {
				attemptId: event.payload.attemptId,
				attemptedBy: attemptedBy,
				score: event.payload.score,
				totalPoints: event.payload.totalPoints,
			};
			await this.amqpConnection.publish('eventbus', 'exam.attempt.scored', message, {
				persistent: true,
			});
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
