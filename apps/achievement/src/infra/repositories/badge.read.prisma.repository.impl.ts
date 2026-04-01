import { IBadgeReadRepository } from '../../domain/repositories/badge.read.repository';
import { Badge, UserBadge } from '../../presentation/read-models/badge.read-model';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma-client/achievement';

@Injectable()
export class BadgeReadPrismaRepositoryImpl implements IBadgeReadRepository {
	constructor(private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>) {}

	async getAll(): Promise<Badge[]> {
		const badges = await this.txHost.tx.badge.findMany({ orderBy: { name: 'desc' } });
		return badges.map(b => ({
			name: b.name,
			displayName: b.displayName,
			description: b.description,
		}));
	}

	/**
	 * Sort from latest to oldest updated time + id
	 */
	async getUsersBadges(
		userId: string,
		opts: { lastId?: string; limit: number },
	): Promise<UserBadge[]> {
		const badges = await this.txHost.tx.userBadge.findMany({
			where: { uid: userId },
			orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
			select: {
				id: true,
				badge: { select: { name: true, displayName: true, description: true } },
				updatedAt: true,
			},
			take: opts.limit,
			...(opts.lastId && {
				cursor: { id: opts.lastId },
				skip: 1,
			}),
		});
		return badges.map(b => ({
			id: b.id,
			name: b.badge.name,
			displayName: b.badge.displayName,
			description: b.badge.description,
			date: b.updatedAt,
		}));
	}
}
