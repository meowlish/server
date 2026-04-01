import {
	type IFileRepository,
	IFileRepositoryToken,
} from '../../../domain/repositories/file.repository';
import { FileRemovedIntegrationEvent } from '../files-removed.event';
import { AmqpConnectionManager } from '@golevelup/nestjs-rabbitmq';
import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppLoggerService } from '@server/logger';
import { Job, Queue } from 'bullmq';

@Processor('exam')
export class FilesRemovedPublisher extends WorkerHost {
	constructor(
		@Inject(IFileRepositoryToken) private readonly fileRepository: IFileRepository,
		private readonly amqpConnectionManager: AmqpConnectionManager,
		private readonly logger: AppLoggerService,
	) {
		super();
	}

	get amqpConnection() {
		const connection = this.amqpConnectionManager.getConnection('pub');
		if (!connection) throw new InternalServerErrorException('AMQP "pub" connection not available');
		return connection;
	}

	async process(job: Job) {
		try {
			if (job.name !== 'publish-deleted-files') return;
			const fileIds = await this.fileRepository.getAndRemoveDeletedFileIds();
			const message: FileRemovedIntegrationEvent = {
				fileIds: fileIds,
			};
			await this.amqpConnection.publish('eventbus', 'exam.files.removed', message, {
				persistent: true,
			});
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}

@Injectable()
export class FilesRemovedScheduler {
	constructor(
		@InjectQueue('exam')
		private readonly queue: Queue,
	) {}

	async onModuleInit() {
		await this.queue.add(
			'publish-deleted-files',
			{},
			{
				jobId: 'publish-deleted-files', // prevents duplicates
				repeat: {
					every: 60_000, // every minute
				},
			},
		);
	}
}
