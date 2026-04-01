import { Badge, UserBadge } from '../../presentation/read-models/badge.read-model';

export interface IBadgeReadRepository {
	getAll(): Promise<Badge[]>;
	getUsersBadges(userId: string, opts: { lastId?: string; limit: number }): Promise<UserBadge[]>;
}

export const IBadgeReadRepositoryToken = Symbol('IBadgeReadRepository');
