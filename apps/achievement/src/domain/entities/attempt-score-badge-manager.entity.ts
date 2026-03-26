import { Badge } from '../../enums/badge.enum';
import { BadgeAddedEvent } from '../events/badge.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate } from '@server/utils';

export class AttemptScoreBadgeManager
	extends AggregateRoot<Event<any>>
	implements IAggregate<AttemptScoreBadgeManager>
{
	public readonly id: string;
	public readonly version: number;
	public perfect: number;
	public good: number;
	public badges: Set<Badge>;

	public constructor(constructorOptions: {
		id: string;
		version: number;
		perfect: number;
		good: number;
		badges: Badge[];
	}) {
		super();
		this.id = constructorOptions.id;
		this.version = constructorOptions.version;
		this.perfect = constructorOptions.perfect;
		this.good = constructorOptions.good;
		this.badges = new Set(constructorOptions.badges);
	}

	updateProgress(score: number, totalPoints: number) {
		const rank = totalPoints === 0 ? 0 : score / totalPoints;
		if (rank >= 0.8 && rank < 1) {
			this.good++;
			if (this.good >= 1) this.addBadge(Badge.FirstGoodScore);
			if (this.good >= 10) this.addBadge(Badge.TenthGoodScore);
			if (this.good >= 100) this.addBadge(Badge.HundredthGoodScore);
		} else if (rank === 1) {
			this.perfect++;
			if (this.perfect >= 1) this.addBadge(Badge.FirstPerfectScore);
			if (this.perfect >= 10) this.addBadge(Badge.TenthPerfectScore);
			if (this.perfect >= 100) this.addBadge(Badge.HundredthPerfectScore);
		}
	}

	private addBadge(badge: Badge) {
		if (!this.badges.has(badge)) {
			this.badges.add(badge);
			this.apply(new BadgeAddedEvent({ uid: this.id, badge: badge }));
		}
	}
}
