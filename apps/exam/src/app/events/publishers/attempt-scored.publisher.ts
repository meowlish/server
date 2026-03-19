import { AttemptScoredEvent } from '../../../domain/events/attempt.event';
import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../domain/repositories/attempt.repository';
import { AttemptScoredIntegrationEvent } from '../attempt-scored.event';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(AttemptScoredEvent)
export class AttemptScoredPublisher implements IEventHandler<AttemptScoredEvent> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
		private readonly amqpConnection: AmqpConnection,
		private readonly logger: AppLoggerService,
	) {}

	async handle(event: AttemptScoredEvent) {
		try {
			const attemptedBy = await this.attemptRepository.getAttemptedUser(event.payload.attemptId);
			await this.amqpConnection.publish(
				'eventbus',
				'exam.attempt.scored',
				new AttemptScoredIntegrationEvent({
					attemptId: event.payload.attemptId,
					attemptedBy: attemptedBy,
					score: event.payload.score,
					totalPoints: event.payload.totalPoints,
				}),
				{ persistent: true },
			);
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
