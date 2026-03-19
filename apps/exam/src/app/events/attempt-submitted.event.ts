import { IntegrationEvent } from '@server/utils';

export class AttemptSubmittedIntegrationEvent extends IntegrationEvent<{
	attemptId: string;
	attemptedBy: string;
}>() {}
