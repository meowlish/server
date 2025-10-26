import { IEntity } from '@common/abstract/entity/entity.interface';
import { IValueObject } from '@common/abstract/value-object.interface';
import { Action } from '@common/enums/action.enum';

export class UserRole implements IValueObject<UserRole> {
	public action: Action = Action.READ;
	constructor(public readonly roleId: string) {}

	equals(vo: UserRole): boolean {
		return this.roleId === vo.roleId;
	}
}

export class Identity implements IEntity<Identity> {
	public readonly id: string;
	public identityRoles: UserRole[];
	public readonly createdAt: Date;
	public readonly updatedAt: Date;

	constructor(constructorOptions?: {
		id?: string;
		createdAt?: Date;
		updatedAt?: Date;
		identityRoles?: UserRole[];
	}) {
		this.id = constructorOptions?.id || crypto.randomUUID();
		this.createdAt = constructorOptions?.createdAt || new Date();
		this.updatedAt = constructorOptions?.updatedAt || new Date();
		this.identityRoles = constructorOptions?.identityRoles || [];
	}

	public addRole(role: UserRole) {
		const rolePos = this.identityRoles.findIndex(r => r.equals(role));
		if (rolePos === -1) {
			role.action = Action.CREATE;
			this.identityRoles.push(role);
		}
	}

	public removeRole(role: UserRole) {
		const rolePos = this.identityRoles.findIndex(r => r.equals(role));
		if (rolePos !== -1) {
			this.identityRoles[rolePos].action = Action.DELETE;
		}
	}

	public validate(): boolean {
		return true;
	}

	public equals(entity: Identity): boolean {
		return this.id === entity?.id;
	}
}
