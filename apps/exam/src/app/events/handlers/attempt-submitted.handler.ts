import { AttemptSubmittedEvent } from '../../../domain/events/attempt.event';
import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../domain/repositories/attempt.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(AttemptSubmittedEvent)
export class AttemptSubmittedHandler implements IEventHandler<AttemptSubmittedEvent> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
		private readonly logger: AppLoggerService,
	) {}

	async handle(event: AttemptSubmittedEvent) {
		try {
			const payload = event.payload;
			const attempt = await this.attemptRepository.getScoreEvaluator(payload.attemptId);
			if (!attempt) throw new NotFoundException('Attempt not found');
			attempt.evaluateScore();
			await this.attemptRepository.save(attempt);
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
