import { Badge, BadgeType } from '../enums/badge.enum';

export const BADGE_INFORMATION: Record<
	Badge,
	{ displayName: string; description: string; type: BadgeType }
> = {
	[Badge.LoginSevenDaysStreak]: {
		displayName: 'Regular',
		description: 'Logged in 7 days in a row',
		type: BadgeType.Login,
	},
	[Badge.LoginTwoWeeksStreak]: {
		displayName: 'Busy Bee',
		description: 'Logged in 14 days consecutively',
		type: BadgeType.Login,
	},
	[Badge.LoginOneMonthStreak]: {
		displayName: 'No pain, no gain',
		description: 'Maintained a 30-day login streak',
		type: BadgeType.Login,
	},
	[Badge.LoginOneYearStreak]: {
		displayName: 'V.I.P',
		description: 'Logged in every day for a year',
		type: BadgeType.Login,
	},

	[Badge.LoginSevenDays]: {
		displayName: 'Getting Into the Groove',
		description: 'Logged in for 7 total days',
		type: BadgeType.Login,
	},
	[Badge.LoginTwoWeeks]: {
		displayName: 'Consistent Explorer',
		description: 'Logged in for 14 total days',
		type: BadgeType.Login,
	},
	[Badge.LoginOneMonth]: {
		displayName: 'Dedicated Learner',
		description: 'Logged in for 30 total days',
		type: BadgeType.Login,
	},
	[Badge.LoginOneYear]: {
		displayName: 'Anniversary Goal',
		description: 'Logged in for 365 total days',
		type: BadgeType.Login,
	},

	[Badge.FirstCompleteAttempt]: {
		displayName: 'First Step Taken',
		description: 'Completed your first attempt',
		type: BadgeType.AttemptCount,
	},
	[Badge.TenthCompleteAttempt]: {
		displayName: 'Warming Up',
		description: 'Completed 10 attempts',
		type: BadgeType.AttemptCount,
	},
	[Badge.HundredthCompleteAttempt]: {
		displayName: 'Centurion of Effort',
		description: 'Completed 100 attempts',
		type: BadgeType.AttemptCount,
	},

	[Badge.FirstGoodScore]: {
		displayName: 'Nice One',
		description: 'Achieved your first good score',
		type: BadgeType.AttemptScore,
	},
	[Badge.TenthGoodScore]: {
		displayName: 'Sharpening Skills',
		description: 'Achieved 10 good scores',
		type: BadgeType.AttemptScore,
	},
	[Badge.HundredthGoodScore]: {
		displayName: 'Excellence Habit',
		description: 'Achieved 100 good scores',
		type: BadgeType.AttemptScore,
	},

	[Badge.FirstPerfectScore]: {
		displayName: 'Flawless Start',
		description: 'Achieved your first perfect score',
		type: BadgeType.AttemptScore,
	},
	[Badge.TenthPerfectScore]: {
		displayName: 'Precision Pro',
		description: 'Achieved 10 perfect scores',
		type: BadgeType.AttemptScore,
	},
	[Badge.HundredthPerfectScore]: {
		displayName: 'Perfectionist',
		description: 'Achieved 100 perfect scores',
		type: BadgeType.AttemptScore,
	},
};
