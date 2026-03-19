import { AttemptCounterBadgeManager } from '../entities/attempt-counter-badge-manager.entity';
import { AttemptScoreBadgeManager } from '../entities/attempt-score-badge-manager.entity';
import { LoginBadgeManager } from '../entities/login-badge-manager.entity';

export interface IBadgeManagerRepository {
	getAttemptCounterBadgeManager(uid: string): Promise<AttemptCounterBadgeManager>;
	saveAttemptCounterBadgeManager(manager: AttemptCounterBadgeManager): Promise<void>;
	getAttemptScoreBadgeManager(uid: string): Promise<AttemptScoreBadgeManager>;
	saveAttemptScoreBadgeManager(manager: AttemptScoreBadgeManager): Promise<void>;
	getLoginBadgeManager(uid: string): Promise<LoginBadgeManager>;
	saveLoginBadgeManager(manager: LoginBadgeManager): Promise<void>;
}

export const IBadgeManagerRepositoryToken = Symbol('IBadgeManagerRepository');
