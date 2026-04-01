export type Badge = {
	name: string;
	displayName: string;
	description: string;
};

export type UserBadge = Badge & {
	id: string;
	date: Date;
};
