import { Badge, BadgeType } from '../enums/badge.enum';

export const BADGE_INFORMATION: Record<
	Badge,
	{ displayName: string; description: string; type: BadgeType }
> = {
	[Badge.LOGIN_SEVEN_DAYS_STREAK]: {
		displayName: 'Regular',
		description: 'Logged in 7 days in a row',
		type: BadgeType.LOGIN,
	},
	[Badge.LOGIN_TWO_WEEKS_STREAK]: {
		displayName: 'Busy Bee',
		description: 'Logged in 14 days consecutively',
		type: BadgeType.LOGIN,
	},
	[Badge.LOGIN_ONE_MONTH_STREAK]: {
		displayName: 'No pain, no gain',
		description: 'Maintained a 30-day login streak',
		type: BadgeType.LOGIN,
	},
	[Badge.LOGIN_ONE_YEAR_STREAK]: {
		displayName: 'V.I.P',
		description: 'Logged in every day for a year',
		type: BadgeType.LOGIN,
	},

	[Badge.LOGIN_SEVEN_DAYS]: {
		displayName: 'Getting Into the Groove',
		description: 'Logged in for 7 total days',
		type: BadgeType.LOGIN,
	},
	[Badge.LOGIN_TWO_WEEKS]: {
		displayName: 'Consistent Explorer',
		description: 'Logged in for 14 total days',
		type: BadgeType.LOGIN,
	},
	[Badge.LOGIN_ONE_MONTH]: {
		displayName: 'Dedicated Learner',
		description: 'Logged in for 30 total days',
		type: BadgeType.LOGIN,
	},
	[Badge.LOGIN_ONE_YEAR]: {
		displayName: 'Anniversary Goal',
		description: 'Logged in for 365 total days',
		type: BadgeType.LOGIN,
	},

	[Badge.FIRST_COMPLETE_ATTEMPT]: {
		displayName: 'First Step Taken',
		description: 'Completed your first attempt',
		type: BadgeType.ATTEMPT_COUNT,
	},
	[Badge.TENTH_COMPLETE_ATTEMPT]: {
		displayName: 'Warming Up',
		description: 'Completed 10 attempts',
		type: BadgeType.ATTEMPT_COUNT,
	},
	[Badge.HUNDREDTH_COMPLETE_ATTEMPT]: {
		displayName: 'Centurion of Effort',
		description: 'Completed 100 attempts',
		type: BadgeType.ATTEMPT_COUNT,
	},

	[Badge.FIRST_GOOD_SCORE]: {
		displayName: 'Nice One',
		description: 'Achieved your first good score',
		type: BadgeType.ATTEMPT_SCORE,
	},
	[Badge.TENTH_GOOD_SCORE]: {
		displayName: 'Sharpening Skills',
		description: 'Achieved 10 good scores',
		type: BadgeType.ATTEMPT_SCORE,
	},
	[Badge.HUNDREDTH_GOOD_SCORE]: {
		displayName: 'Excellence Habit',
		description: 'Achieved 100 good scores',
		type: BadgeType.ATTEMPT_SCORE,
	},

	[Badge.FIRST_PERFECT_SCORE]: {
		displayName: 'Flawless Start',
		description: 'Achieved your first perfect score',
		type: BadgeType.ATTEMPT_SCORE,
	},
	[Badge.TENTH_PERFECT_SCORE]: {
		displayName: 'Precision Pro',
		description: 'Achieved 10 perfect scores',
		type: BadgeType.ATTEMPT_SCORE,
	},
	[Badge.HUNDREDTH_PERFECT_SCORE]: {
		displayName: 'Perfectionist',
		description: 'Achieved 100 perfect scores',
		type: BadgeType.ATTEMPT_SCORE,
	},
};
