import {
	type IBadgeManagerRepository,
	IBadgeManagerRepositoryToken,
} from '../../../domain/repositories/badge-manager.repository';
import { RabbitPayload, RabbitSubscribe, requeueErrorHandler } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';

class AttemptSubmittedEvent {
	@IsString()
	attemptId!: string;

	@IsString()
	attemptedBy!: string;
}

@Injectable()
export class AttemptSubmittedHandler {
	constructor(
		@Inject(IBadgeManagerRepositoryToken)
		private readonly badgeManagerRepository: IBadgeManagerRepository,
	) {}

	@RabbitSubscribe({
		exchange: 'eventbus',
		routingKey: '*.attempt.submitted',
		queue: 'achievement.events.attempt.submitted',
		errorHandler: requeueErrorHandler,
	})
	async handle(@RabbitPayload() payload: AttemptSubmittedEvent) {
		const attemptCounterBadgeManager =
			await this.badgeManagerRepository.getAttemptCounterBadgeManager(payload.attemptedBy);
		attemptCounterBadgeManager.updateProgress(1);
		await this.badgeManagerRepository.saveAttemptCounterBadgeManager(attemptCounterBadgeManager);
	}
}
