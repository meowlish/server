import { Identity, UserRole } from '@core/auth/domain/entities/identity.entity';
import { IIdentityRepository } from '@core/auth/domain/repositories/identity.repository';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
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
			deletedAt: from.deletedAt,
		};
	}

	toDomain(from: ExtendedIdentity): Identity {
		return new Identity({
			...from,
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
		return foundIdentity ? this.mapper.toDomain(foundIdentity) : null;
	}

	async findOneByUsername(username: string, deleted: boolean = false): Promise<Identity | null> {
		const foundIdentity = await this.txHost.tx.identity.findFirst({
			where: { username: username, deletedAt: deleted ? { not: null } : null },
			include: identityPrismaIncludeObj,
		});
		return foundIdentity ? this.mapper.toDomain(foundIdentity) : null;
	}

	async getClaimsOfId(
		id: string,
		deleted: boolean = false,
	): Promise<{ roles: Role[]; permissions: Permission[] }> {
		const foundIdentity = await this.txHost.tx.identity.findFirst({
			where: { id, deletedAt: deleted ? { not: null } : null },
			include: identityPrismaIncludeObj,
		});
		if (!foundIdentity)
			throw new NotFoundException(`Could not get claims of ${id}, no matching results.`);
		return {
			roles: foundIdentity.identityRoles.map(rIdentityRole =>
				this.mapper.roleMap(rIdentityRole.role.name),
			),
			permissions: [
				...new Set<Permission>(
					foundIdentity.identityRoles.flatMap(rIdentityRole =>
						rIdentityRole.role.rolePermissions.map(rPermission =>
							this.mapper.permissionMap(rPermission.permission.name),
						),
					),
				),
			],
		};
	}

	async create(identity: Identity): Promise<void> {
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
	}

	async update(identity: Identity): Promise<void> {
		const data = this.mapper.toOrm(identity);
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
			// update
			await this.txHost.tx.identity.update({
				where: { id: identity.id },
				data,
			});
		});
	}

	async softDelete(id: string): Promise<void> {
		await this.txHost.tx.identity.update({
			where: { id },
			data: { deletedAt: new Date() },
		});
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

type RepoIdentity = Omit<PrismaIdentity, 'id' | 'updatedAt' | 'createdAt'>;

const identityPrismaIncludeObj = {
	identityRoles: {
		include: { role: { include: { rolePermissions: { include: { permission: true } } } } },
	},
} satisfies Prisma.IdentityInclude;
