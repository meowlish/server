// for when searching
export type MinimalExamInfo = {
	id: string;
	name: string;
	description: string;
	attemptsCount: number;
	duration: number;
	tags: string[]; //root tags only
};
