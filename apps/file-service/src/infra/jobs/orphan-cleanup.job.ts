import { FileService } from '../../app/services/file.service';
import { IFileRepository, IFileRepositoryToken } from '../../domain/repositories/file.repository';
import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService } from '@server/logger';
import { Job, Queue } from 'bullmq';

@Processor('file')
export class OrphanCleanupWorker extends WorkerHost {
	constructor(
		@Inject(IFileRepositoryToken) private readonly fileRepository: IFileRepository,
		private readonly fileService: FileService,
		private readonly logger: AppLoggerService,
	) {
		super();
	}

	async process(job: Job) {
		if (job.name !== 'cleanup-orphaned-files') return;
		const files = await this.fileRepository.getOrphanedFiles();
		const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
		const filesToRemove = files.filter(f => f.updatedAt < fiveMinutesAgo);
		await this.fileService.deleteFiles(filesToRemove.map(f => f.id));
	}
}

@Injectable()
export class OrphanCleanupScheduler {
	constructor(
		@InjectQueue('file')
		private readonly queue: Queue,
	) {}

	async onModuleInit() {
		await this.queue.add(
			'cleanup-orphaned-files',
			{},
			{
				jobId: 'cleanup-orphaned-files', // prevents duplicates
				repeat: {
					every: 5 * 60_000, // every 5 minutes
				},
			},
		);
	}
}
