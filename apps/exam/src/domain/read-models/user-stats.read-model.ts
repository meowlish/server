export type UserStats = {
	attemptCounts: number;
	averageScoreInPercentage: number;
	tagInfos: { name: string; correctPercentage: number }[];
};
