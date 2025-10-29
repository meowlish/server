import { Identity, UserRole } from '@core/auth/domain/entities/identity.entity';
import { IIdentityRepository } from '@core/auth/domain/repositories/identity.repository';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Identity as PrismaIdentity } from '@prisma/client';

import { Action } from '@common/enums/action.enum';
import { Permission } from '@common/enums/permission.enum';
import { Role } from '@common/enums/role.enum';
import { parseEnum } from '@common/utils/functions/string-enum';

@Injectable()
export class IdentityPrismaMapper {
	permissionMap(from: string): Permission {
		return parseEnum(Permission, from);
	}

	roleMap(from: string): Role {
		return parseEnum(Role, from);
	}

	toOrm(from: Identity): RepoIdentity {
		return {
			username: from.username,
			createdAt: from.createdAt,
			deletedAt: from.deletedAt,
			updatedAt: from.updatedAt,
		};
	}

	toDomain(from: ExtendedIdentity): Identity {
		return new Identity(from.username, {
			id: from.id,
			createdAt: from.createdAt,
			updatedAt: from.updatedAt,
			deletedAt: from.deletedAt,
			identityRoles: from.identityRoles.map(rIdentityRole => {
				return new UserRole(rIdentityRole.role.id, {
					name: this.roleMap(rIdentityRole.role.name),
					permission: rIdentityRole.role.rolePermissions.map(rPermission =>
						this.permissionMap(rPermission.permission.name),
					),
				});
			}),
		});
	}
}

@Injectable()
export class IdentityPrismaRepository implements IIdentityRepository {
	constructor(
		private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
		private readonly mapper: IdentityPrismaMapper,
	) {}

	async findOneById(id: string, deleted: boolean = false): Promise<Identity | null> {
		const foundIdentity = await this.txHost.tx.identity.findFirst({
			where: { id, deletedAt: deleted ? { not: null } : null },
			include: identityPrismaIncludeObj,
		});
		return foundIdentity === null ? null : this.mapper.toDomain(foundIdentity);
	}

	async findOneByUsername(username: string, deleted: boolean = false): Promise<Identity | null> {
		const foundIdentity = await this.txHost.tx.identity.findFirst({
			where: { username: username, deletedAt: deleted ? { not: null } : null },
			include: identityPrismaIncludeObj,
		});
		return foundIdentity === null ? null : this.mapper.toDomain(foundIdentity);
	}

	async create(identity: Identity): Promise<Identity> {
		await this.txHost.withTransaction(async () => {
			// create identity
			const rIdentity = await this.txHost.tx.identity.create({
				data: { username: identity.username },
			});

			// create identity-role relationships
			await this.txHost.tx.identityRole.createMany({
				data: identity.identityRoles.map(dRole => {
					return { identityId: rIdentity.id, roleId: dRole.id };
				}),
			});
		});

		// has to fetch again to properly get the role names and permissions
		const result = await this.findOneByUsername(identity.username);
		if (!result) throw Error();
		return result;
	}

	async update(identity: Identity): Promise<Identity> {
		const data = this.mapper.toOrm(identity);
		// I marked the variable with !, might be troublesome later
		let updatedIdentity!: ExtendedIdentity;
		await this.txHost.withTransaction(async () => {
			// add identity-role relationships
			await this.txHost.tx.identityRole.createMany({
				data: identity.identityRoles
					.filter(dRole => dRole.action === Action.CREATE)
					.map(dRole => {
						return { identityId: identity.id, roleId: dRole.id };
					}),
			});
			// delete identity-role relationships
			const toBeDeletedIdentityRoles = identity.identityRoles
				.filter(dRole => dRole.action === Action.DELETE)
				.map(dRole => dRole.id);
			await this.txHost.tx.identityRole.deleteMany({
				where: { identityId: identity.id, roleId: { in: toBeDeletedIdentityRoles } },
			});
			// assigning outside variable within the callback
			updatedIdentity = await this.txHost.tx.identity.update({
				where: { id: identity.id },
				data,
				include: identityPrismaIncludeObj,
			});
		});
		const mappedIdentity = this.mapper.toDomain(updatedIdentity);
		return mappedIdentity;
	}

	async softDelete(identity: Identity): Promise<Identity> {
		const deletedIdentity = await this.txHost.tx.identity.update({
			where: { id: identity.id },
			data: { deletedAt: new Date() },
			include: identityPrismaIncludeObj,
		});
		const mappedIdentity = this.mapper.toDomain(deletedIdentity);
		return mappedIdentity;
	}
}

// extended identity type with JOINS
type ExtendedIdentity = Prisma.IdentityGetPayload<{
	include: {
		identityRoles: {
			include: {
				role: {
					include: { rolePermissions: { include: { permission: true } } };
				};
			};
		};
	};
}>;

type RepoIdentity = Omit<PrismaIdentity, 'id'>;

const identityPrismaIncludeObj = {
	identityRoles: {
		include: { role: { include: { rolePermissions: { include: { permission: true } } } } },
	},
};
