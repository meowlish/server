import {
	type IFileRepository,
	IFileRepositoryToken,
} from '../../../domain/repositories/file.repository';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService } from '@server/logger';
import { IsArray, IsString, ValidateIf } from 'class-validator';

export class FileRemovedEvent {
	@IsString()
	@ValidateIf((o: FileRemovedEvent) => !o.fileIds)
	fileId?: string;

	@IsArray()
	@IsString({ each: true })
	@ValidateIf((o: FileRemovedEvent) => !o.fileId)
	fileIds: string[] = [];
}

@Injectable()
export class FileRemovedHandler {
	constructor(
		@Inject(IFileRepositoryToken) private readonly fileRepository: IFileRepository,
		private readonly logger: AppLoggerService,
	) {}

	@RabbitSubscribe({
		connection: 'sub',
		exchange: 'eventbus',
		routingKey: ['*.file.removed', '*.files.removed'],
		queue: 'file.events.files.removed',
		queueOptions: {
			durable: true,
		},
	})
	async handle(@RabbitPayload() payload: FileRemovedEvent) {
		const fileIds = [payload.fileId, ...payload.fileIds].filter((f): f is string => !!f);
		try {
			await this.fileRepository.decrementRef(fileIds);
		} catch (e) {
			this.logger.error(e as string);
		}
	}
}
