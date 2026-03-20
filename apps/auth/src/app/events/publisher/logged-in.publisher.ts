import { UserLoggedInEvent } from '../../../domain/events/user-activities.event';
import { UserLoggedInIntegrationEvent } from '../logged-in.event';
import { AmqpConnectionManager } from '@golevelup/nestjs-rabbitmq';
import { InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInPublisher implements IEventHandler<UserLoggedInEvent> {
	constructor(
		private readonly amqpConnectionManager: AmqpConnectionManager,
		private readonly logger: AppLoggerService,
	) {}

	get amqpConnection() {
		const connection = this.amqpConnectionManager.getConnection('pub');
		if (!connection) throw new InternalServerErrorException('AMQP "pub" connection not available');
		return connection;
	}

	async handle(event: UserLoggedInEvent) {
		try {
			await this.amqpConnection.publish(
				'eventbus',
				'auth.user.login',
				new UserLoggedInIntegrationEvent({
					uid: event.payload.uid,
					date: event.payload.date,
				}),
				{ persistent: true },
			);
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
