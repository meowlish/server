import { Goal } from '../../domain/entities/goal.entity';
import { IGoalRepository } from '../../domain/repositories/goal.repository';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma-client/exam';

@Injectable()
export class GoalPrismaRepositoryImpl implements IGoalRepository {
	constructor(private readonly txHost: TransactionHost<TransactionalAdapterPrisma<PrismaClient>>) {}

	async setGoal(goal: Goal): Promise<Goal> {
		return await this.txHost.tx.goal.create({ data: goal });
	}

	async deleteGoal(uid: string): Promise<void> {
		await this.txHost.tx.goal.delete({ where: { uid: uid } });
	}

	async updateGoal(goal: Goal): Promise<Goal> {
		return await this.txHost.tx.goal.update({ where: { uid: goal.uid }, data: goal });
	}

	async getGoal(uid: string): Promise<Goal> {
		const foundGoal = await this.txHost.tx.goal.findUnique({ where: { uid: uid } });
		if (!foundGoal) throw new NotFoundException('Goal not found');
		return foundGoal;
	}
}
