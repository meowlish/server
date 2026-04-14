import { Badge } from '../../enums/badge.enum';
import { BadgeAddedEvent } from '../events/badge.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { Event, IAggregate } from '@server/utils';

export class LoginBadgeManager
	extends AggregateRoot<Event<any>>
	implements IAggregate<LoginBadgeManager>
{
	public readonly id: string;
	public readonly version: number;
	public total: number;
	public longestStreak: number;
	public startedAt: Date;
	public lastLogin: Date;
	public badges: Set<Badge>;

	public constructor(constructorOptions: {
		id: string;
		version: number;
		total: number;
		longestStreak: number;
		startedAt: Date;
		lastLogin: Date;
		badges: Badge[];
	}) {
		super();
		this.id = constructorOptions.id;
		this.version = constructorOptions.version;
		this.total = constructorOptions.total;
		this.longestStreak = constructorOptions.longestStreak;
		this.startedAt = constructorOptions.startedAt;
		this.lastLogin = constructorOptions.lastLogin;
		this.badges = new Set(constructorOptions.badges);
	}

	updateProgress(loginTime: Date) {
		// update recorded time
		const diffMs =
			this.toDateOnlyUTC(loginTime).getTime() - this.toDateOnlyUTC(this.lastLogin).getTime();
		const diffDays = diffMs / (1000 * 60 * 60 * 24);
		if (diffDays >= 1) this.total++;
		if (diffDays >= 2) this.startedAt = loginTime;
		this.lastLogin = loginTime;
		if (this.total >= 7) this.addBadge(Badge.LoginSevenDays);
		if (this.total >= 30) this.addBadge(Badge.LoginOneMonth);
		if (this.total >= 365) this.addBadge(Badge.LoginOneYear);
		// update streak
		const diffStreakMs =
			this.toDateOnlyUTC(this.lastLogin).getTime() - this.toDateOnlyUTC(this.startedAt).getTime();
		const newStreak = diffStreakMs / (1000 * 60 * 60 * 24);
		if (newStreak >= this.longestStreak) {
			this.longestStreak = newStreak;
			if (this.longestStreak >= 7) this.addBadge(Badge.LoginSevenDaysStreak);
			if (this.longestStreak >= 30) this.addBadge(Badge.LoginOneMonthStreak);
			if (this.longestStreak >= 365) this.addBadge(Badge.LoginOneYearStreak);
		}
	}

	private addBadge(badge: Badge) {
		if (!this.badges.has(badge)) {
			this.badges.add(badge);
			this.apply(new BadgeAddedEvent({ uid: this.id, badge: badge }));
		}
	}

	// convert time to 00:00:00 of the same date
	private toDateOnlyUTC(d: Date): Date {
		return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
	}
}
