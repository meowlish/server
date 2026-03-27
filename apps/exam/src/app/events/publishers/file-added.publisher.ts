import { QuestionFileAdded, SectionFileAdded } from '../../../domain/events/exam-management.event';
import { FileAddedIntegrationEvent } from '../file-added.event';
import { AmqpConnectionManager } from '@golevelup/nestjs-rabbitmq';
import { InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppLoggerService } from '@server/logger';

@EventsHandler(QuestionFileAdded, SectionFileAdded)
export class FileAddedPublisher implements IEventHandler<QuestionFileAdded | SectionFileAdded> {
	constructor(
		private readonly amqpConnectionManager: AmqpConnectionManager,
		private readonly logger: AppLoggerService,
	) {}

	get amqpConnection() {
		const connection = this.amqpConnectionManager.getConnection('pub');
		if (!connection) throw new InternalServerErrorException('AMQP "pub" connection not available');
		return connection;
	}

	async handle(event: QuestionFileAdded | SectionFileAdded) {
		try {
			await this.amqpConnection.publish(
				'eventbus',
				'exam.file.added',
				new FileAddedIntegrationEvent({
					fileId: event.payload.fileId,
				}),
				{ persistent: true },
			);
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
