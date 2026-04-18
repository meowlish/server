import { Command } from '@server/utils';

export class UpdateIdentityCommandPayload {
	public readonly identityId: string;
	public readonly username?: string;
	public readonly fullName?: string | null;
	public readonly bio?: string | null;
	public readonly avatarId?: string | null;
	setFullNameNull?: boolean;
	setBioNull?: boolean;
	setAvatarIdNull?: boolean;

	constructor(constructorOptions: {
		identityId: string;
		username?: string;
		fullName?: string;
		bio?: string;
		avatarId?: string;
		setFullNameNull?: boolean;
		setBioNull?: boolean;
		setAvatarIdNull?: boolean;
	}) {
		this.identityId = constructorOptions.identityId;
		this.username = constructorOptions.username;
		this.fullName = constructorOptions.setFullNameNull ? null : constructorOptions.fullName;
		this.bio = constructorOptions.setBioNull ? null : constructorOptions.bio;
		this.avatarId = constructorOptions.setAvatarIdNull ? null : constructorOptions.avatarId;
	}
}

export class UpdateIdentityCommand extends Command<UpdateIdentityCommandPayload> {}
