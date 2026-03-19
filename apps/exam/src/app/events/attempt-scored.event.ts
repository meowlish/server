import { IntegrationEvent } from '@server/utils';

export class AttemptScoredIntegrationEvent extends IntegrationEvent<{
	attemptId: string;
	attemptedBy: string;
	score: number;
	totalPoints: number;
}>() {}
