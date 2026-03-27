import { IntegrationEvent } from '@server/utils';

export class FileRemovedIntegrationEvent extends IntegrationEvent<{
	fileIds: string[];
}>() {}
