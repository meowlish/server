import { Badge } from '../../enums/badge.enum';
import { BadgeAddedEvent } from '../events/badge.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate } from '@server/utils';

export class AttemptCounterBadgeManager
	extends AggregateRoot<Event<any>>
	implements IAggregate<AttemptCounterBadgeManager>
{
	public readonly id: string;
	public version: number;
	public total: number;
	public badges: Set<Badge>;

	public constructor(constructorOptions: {
		id: string;
		version: number;
		total: number;
		badges: Badge[];
	}) {
		super();
		this.version = constructorOptions.version;
		this.id = constructorOptions.id;
		this.total = constructorOptions.total;
		this.badges = new Set(constructorOptions.badges);
	}

	public updateProgress(attemptCount = 1) {
		this.total += attemptCount;
		if (this.total >= 1) this.addBadge(Badge.FirstCompleteAttempt);
		if (this.total >= 10) this.addBadge(Badge.TenthCompleteAttempt);
		if (this.total >= 100) this.addBadge(Badge.HundredthCompleteAttempt);
	}

	private addBadge(badge: Badge) {
		if (!this.badges.has(badge)) {
			this.badges.add(badge);
			this.apply(new BadgeAddedEvent({ uid: this.id, badge: badge }));
		}
	}
}
