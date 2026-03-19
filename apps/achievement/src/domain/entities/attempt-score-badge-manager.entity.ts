import { Badge } from '../../enums/badge.enum';
import { BadgeAddedEvent } from '../events/badge.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate } from '@server/utils';

export class AttemptScoreBadgeManager
	extends AggregateRoot<Event<any>>
	implements IAggregate<AttemptScoreBadgeManager>
{
	public readonly id: string;
	public version: number;
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
		if (rank >= 0.8) {
			this.good++;
			if (this.good >= 1) this.addBadge(Badge.FIRST_GOOD_SCORE);
			if (this.good >= 10) this.addBadge(Badge.TENTH_GOOD_SCORE);
			if (this.good >= 100) this.addBadge(Badge.HUNDREDTH_GOOD_SCORE);
		}

		if (rank === 1) {
			this.perfect++;
			if (this.perfect >= 1) this.addBadge(Badge.FIRST_PERFECT_SCORE);
			if (this.perfect >= 10) this.addBadge(Badge.TENTH_PERFECT_SCORE);
			if (this.perfect >= 100) this.addBadge(Badge.HUNDREDTH_PERFECT_SCORE);
		}
	}

	private addBadge(badge: Badge) {
		if (!this.badges.has(badge)) {
			this.badges.add(badge);
			this.apply(new BadgeAddedEvent({ uid: this.id, badge: badge }));
		}
	}
}
