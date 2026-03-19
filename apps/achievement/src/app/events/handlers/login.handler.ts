import {
	type IBadgeManagerRepository,
	IBadgeManagerRepositoryToken,
} from '../../../domain/repositories/badge-manager.repository';
import { RabbitPayload, RabbitSubscribe, requeueErrorHandler } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

class LoginEvent {
	@IsString()
	uid!: string;

	@Type(() => Date)
	@IsDate()
	date!: Date;
}

@Injectable()
export class LoginHandler {
	constructor(
		@Inject(IBadgeManagerRepositoryToken)
		private readonly badgeManagerRepository: IBadgeManagerRepository,
	) {}

	@RabbitSubscribe({
		exchange: 'eventbus',
		routingKey: '*.user.login',
		queue: 'achievement.events.user.login',
		errorHandler: requeueErrorHandler,
	})
	async handle(@RabbitPayload() payload: LoginEvent) {
		const loginBadgeManager = await this.badgeManagerRepository.getLoginBadgeManager(payload.uid);
		loginBadgeManager.updateProgress(payload.date);
		await this.badgeManagerRepository.saveLoginBadgeManager(loginBadgeManager);
	}
}
