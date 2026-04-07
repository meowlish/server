export type ExamStatistics = {
	averageDuration: number;
	averageScoreInPercentage: number;
	questions: { correctCount: number; totalCount: number; tags: string[] }[];
};
