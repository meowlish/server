export type IdentityReadModel = {
	id: string;
	username: string;
	fullName?: string;
	bio?: string;
	avatarFileId?: string;
	permissions: string[];
	roles: string[];
};
