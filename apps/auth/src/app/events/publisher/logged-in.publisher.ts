import { UserLoggedInEvent } from '../../../domain/events/user-activities.event';
import { UserLoggedInIntegrationEvent } from '../logged-in.event';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInPublisher implements IEventHandler<UserLoggedInEvent> {
	constructor(
		private readonly amqpConnection: AmqpConnection,
		private readonly logger: AppLoggerService,
	) {}

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
