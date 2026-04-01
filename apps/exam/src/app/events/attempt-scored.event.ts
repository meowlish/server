export type AttemptScoredIntegrationEvent = {
	attemptId: string;
	attemptedBy: string;
	score: number;
	totalPoints: number;
};
