import { ConflictException, NotFoundException } from '@nestjs/common';
import { Action, IEntity } from '@server/utils';

export class Identity implements IEntity<Identity> {
	static newId() {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public username: string;
	public roleIds: Map<string, Action>;
	public readonly createdAt: Date;
	public readonly updatedAt: Date;
	public deletedAt: Date | null;

	constructor(constructorOptions: {
		id?: string;
		username: string;
		createdAt?: Date;
		updatedAt?: Date;
		deletedAt?: Date | null;
		roleIds?: string[];
	}) {
		this.id = constructorOptions.id ?? Identity.newId();
		this.username = constructorOptions.username;
		this.createdAt = constructorOptions.createdAt ?? new Date();
		this.updatedAt = constructorOptions.updatedAt ?? new Date();
		this.deletedAt = constructorOptions.deletedAt ?? null;
		this.roleIds = new Map(constructorOptions.roleIds?.map(id => [id, Action.READ]));
	}

	public updateDetails(options: { username?: string }): void {
		if (options.username) this.username = options.username;
	}

	public addRole(roleId: string): void {
		if (this.roleIds.get(roleId)) throw new ConflictException('Role already exists');
		this.roleIds.set(roleId, Action.CREATE);
	}

	public removeRole(roleId: string): void {
		this.roleIds.set(roleId, Action.DELETE);
	}

	public softDelete(): void {
		if (this.deletedAt !== null) {
			throw new NotFoundException('Identity was already deleted');
		}
		this.deletedAt = new Date();
	}
}
