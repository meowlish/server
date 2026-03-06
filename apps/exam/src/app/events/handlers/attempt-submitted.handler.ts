import { AttemptSubmittedEvent } from '../../../domain/events/attempt.event';
import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../domain/repositories/attempt.repository';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export class AttemptSubmittedHandler implements IEventHandler<AttemptSubmittedEvent> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
		private readonly logger = new Logger(AttemptSubmittedHandler.name),
	) {}

	async handle(event: AttemptSubmittedEvent) {
		try {
			const payload = event.payload;
			const attempt = await this.attemptRepository.getScoreEvaluator(payload.attemptId);
			if (!attempt) throw new NotFoundException('Attempt not found');
			attempt.evaluateScore();
			await this.attemptRepository.save(attempt);
		} catch (e) {
			this.logger.error(e);
		}
	}
}
