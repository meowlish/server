import { Goal } from '../entities/goal.entity';

export interface IGoalRepository {
	setGoal(goal: Goal): Promise<Goal>;
	deleteGoal(uid: string): Promise<void>;
	updateGoal(goal: Goal): Promise<Goal>;
	getGoal(uid: string): Promise<Goal>;
}

export const IGoalRepositoryToken = Symbol('IGoalRepository');
