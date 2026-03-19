import { AttemptSubmittedEvent } from '../../../domain/events/attempt.event';
import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../domain/repositories/attempt.repository';
import { AttemptSubmittedIntegrationEvent } from '../attempt-submitted.event';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(AttemptSubmittedEvent)
export class AttemptSubmittedPublisher implements IEventHandler<AttemptSubmittedEvent> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
		private readonly amqpConnection: AmqpConnection,
		private readonly logger: AppLoggerService,
	) {}

	async handle(event: AttemptSubmittedEvent) {
		try {
			const attemptedBy = await this.attemptRepository.getAttemptedUser(event.payload.attemptId);
			await this.amqpConnection.publish(
				'eventbus',
				'exam.attempt.submitted',
				new AttemptSubmittedIntegrationEvent({
					attemptId: event.payload.attemptId,
					attemptedBy: attemptedBy,
				}),
				{ persistent: true },
			);
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
