import {
	CredAddedEvent,
	CredDeletedEvent,
	CredUpdatedEvent,
	RoleAddedEvent,
	RoleDeletedEvent,
} from '../events/identity-update.events';
import { Credential, type CredentialUpdatableProperties } from './credential.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate } from '@server/utils';

export class Identity extends AggregateRoot<Event<any>> implements IAggregate<Identity> {
	public static newId(): string {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public username: string;
	public roleIds: Set<string>;
	public credentials: Credential[];
	public readonly createdAt: Date;
	public readonly updatedAt: Date;
	public deletedAt: Date | null;

	public constructor(constructorOptions: {
		id?: string;
		username: string;
		createdAt?: Date;
		updatedAt?: Date;
		deletedAt?: Date | null;
		roleIds?: string[];
		credentials?: Credential[];
	}) {
		super();
		this.id = constructorOptions.id ?? Identity.newId();
		this.username = constructorOptions.username;
		this.createdAt = constructorOptions.createdAt ?? new Date();
		this.updatedAt = constructorOptions.updatedAt ?? new Date();
		this.deletedAt = constructorOptions.deletedAt ?? null;
		this.roleIds = new Set(constructorOptions.roleIds);
		this.credentials = constructorOptions.credentials ?? [];
	}

	public updateDetails(options: IdentityUpdatableProperties): void {
		if (options.username) this.username = options.username;
	}

	public addRole(roleId: string): void {
		if (this.roleIds.has(roleId)) throw new ConflictException('Role already exists');
		this.roleIds.add(roleId);
		this.apply(new RoleAddedEvent({ identityId: this.id, roleId: roleId }));
	}

	public removeRole(roleId: string): void {
		if (!this.roleIds.has(roleId)) throw new ConflictException('Role does not exist');
		this.roleIds.delete(roleId);
		this.apply(new RoleDeletedEvent({ identityId: this.id, roleId: roleId }));
	}

	public addCredential(cred: Credential): void {
		for (const x of this.credentials) {
			if (x.id === cred.id) throw new ConflictException("Credential's id must be unique");
			if (x.identifier === cred.identifier && x.loginType === cred.loginType)
				throw new ConflictException(
					'Identity cannot have the same identifier for the same type of credential',
				);
		}
		this.credentials.push(cred);
		this.apply(new CredAddedEvent({ identityId: this.id, data: structuredClone(cred) }));
	}

	public deleteCredential(id: string): void {
		const idx = this.credentials.findIndex(cred => cred.id === id);
		if (idx === -1) throw new NotFoundException('Credential not found');
		this.credentials.splice(idx, 1);
		this.apply(new CredDeletedEvent({ identityId: this.id, credId: id }));
	}

	public updateCredential(credId: string, updateOptions: CredentialUpdatableProperties): void {
		if (!Object.keys(updateOptions).length) return;
		const idx = this.credentials.findIndex(cred => cred.id === credId);
		if (idx === -1) throw new NotFoundException('Credential not found');
		const updatedCred = this.credentials[idx];
		updatedCred.update(updateOptions);
		const duplicateCredIdx = this.credentials.findIndex(
			cred =>
				cred.id !== updatedCred.id &&
				cred.identifier === updatedCred.identifier &&
				cred.loginType === updatedCred.loginType,
		);
		if (duplicateCredIdx !== -1)
			throw new ConflictException(
				'Identity cannot have the same identifier for the same type of credential',
			);
		this.apply(
			new CredUpdatedEvent({
				identityId: this.id,
				credId: credId,
				data: updateOptions,
			}),
		);
	}

	public softDelete(): void {
		if (this.deletedAt !== null) {
			throw new NotFoundException('Identity was already deleted');
		}
		this.deletedAt = new Date();
	}
}

export type IdentityUpdatableProperties = Partial<Pick<Identity, 'username'>>;
