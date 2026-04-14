import { AttemptCreatedEvent } from '../events/attempt.event';
import { Attempt } from './attempt.entity';
import { ExamId } from './exam.entity';
import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate } from '@server/utils';

export class AttemptConfig extends AggregateRoot<Event<any>> implements IAggregate<AttemptConfig> {
	public static newId() {
		return Attempt.newId();
	}

	public readonly id: string;
	public examId: ExamId;
	public sectionIds: string[] | null;
	public attemptedBy: string;
	public startedAt: Date;
	public durationLimit: number;
	public isStrict: boolean;

	public constructor(constructorOptions: {
		id?: string;
		examId: ExamId;
		sectionIds?: string[] | null;
		attemptedBy: string;
		startedAt?: Date;
		durationLimit: number;
		isStrict?: boolean;
	}) {
		super();
		this.id = constructorOptions.id ?? AttemptConfig.newId();
		this.examId = constructorOptions.examId;
		this.sectionIds = constructorOptions.sectionIds ?? null;
		this.attemptedBy = constructorOptions.attemptedBy;
		this.startedAt = constructorOptions.startedAt ?? new Date();
		if (constructorOptions.durationLimit <= 0)
			throw new BadRequestException('Duration limit must be positive');
		this.durationLimit = constructorOptions.durationLimit;
		this.isStrict = constructorOptions.isStrict ?? false;

		this.apply(new AttemptCreatedEvent(structuredClone(this)));
	}
}
