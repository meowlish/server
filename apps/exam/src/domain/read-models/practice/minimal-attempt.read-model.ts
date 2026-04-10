// view when listing attempt history
export type MinimalAttemptInfo = {
	id: string;
	startedAt: Date;
	endedAt?: Date;
	durationLimit: number;
	score?: number;
	totalPoints?: number;
	isStrict: boolean;
};
