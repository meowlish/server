import { IntegrationEvent } from '@server/utils';

export class FileAddedIntegrationEvent extends IntegrationEvent<{
	fileId: string;
}>() {}
