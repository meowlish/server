import { NotFoundException } from '@nestjs/common';

import { IEntity } from '@common/abstract/entity/entity.interface';
import { IValueObject } from '@common/abstract/value-object.interface';
import { Action } from '@common/enums/action.enum';
import { Permission } from '@common/enums/permission.enum';
import { Role } from '@common/enums/role.enum';

type RolePermission = {
	name: Role;
	permission: Permission[];
};

export class UserRole implements IValueObject<UserRole> {
	public action: Action = Action.READ;
	constructor(
		public readonly id: string,
		public readonly description?: RolePermission,
	) {}

	equals(vo: UserRole): boolean {
		return this.id === vo.id;
	}
}

export class Identity implements IEntity<Identity> {
	static newId() {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public identityRoles: UserRole[];
	public readonly createdAt: Date;
	public readonly updatedAt: Date;
	public deletedAt: Date | null;

	constructor(
		public username: string,
		constructorOptions?: {
			id?: string;
			createdAt?: Date;
			updatedAt?: Date;
			deletedAt?: Date | null;
			identityRoles?: UserRole[];
		},
	) {
		this.id = constructorOptions?.id ?? Identity.newId();
		this.createdAt = constructorOptions?.createdAt ?? new Date();
		this.updatedAt = constructorOptions?.updatedAt ?? new Date();
		this.deletedAt = constructorOptions?.deletedAt ?? null;
		this.identityRoles = constructorOptions?.identityRoles ?? [];
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

	public softDelete() {
		if (this.deletedAt !== null) {
			throw new NotFoundException('Identity was already deleted');
		}
		this.deletedAt = new Date();
	}

	public equals(entity: Identity): boolean {
		return this.id === entity?.id;
	}
}
