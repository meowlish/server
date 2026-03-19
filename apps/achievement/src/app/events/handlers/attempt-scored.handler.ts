import {
	type IBadgeManagerRepository,
	IBadgeManagerRepositoryToken,
} from '../../../domain/repositories/badge-manager.repository';
import { RabbitPayload, RabbitSubscribe, requeueErrorHandler } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';

class AttemptScoredEvent {
	@IsString()
	attemptId!: string;

	@IsString()
	attemptedBy!: string;

	@IsNumber()
	score!: number;

	@IsNumber()
	totalPoints!: number;
}

@Injectable()
export class AttemptScoredHandler {
	constructor(
		@Inject(IBadgeManagerRepositoryToken)
		private readonly badgeManagerRepository: IBadgeManagerRepository,
	) {}

	@RabbitSubscribe({
		exchange: 'eventbus',
		routingKey: '*.attempt.scored',
		queue: 'achievement.events.attempt.scored',
		errorHandler: requeueErrorHandler,
	})
	async handle(@RabbitPayload() payload: AttemptScoredEvent) {
		const attemptScoreBadgeManager = await this.badgeManagerRepository.getAttemptScoreBadgeManager(
			payload.attemptedBy,
		);
		attemptScoreBadgeManager.updateProgress(payload.score, payload.totalPoints);
		await this.badgeManagerRepository.saveAttemptScoreBadgeManager(attemptScoreBadgeManager);
	}
}
