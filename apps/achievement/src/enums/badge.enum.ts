export enum Badge {
	LoginSevenDaysStreak = 'LOGIN_SEVEN_DAYS_STREAK',
	LoginTwoWeeksStreak = 'LOGIN_TWO_WEEKS_STREAK',
	LoginOneMonthStreak = 'LOGIN_ONE_MONTH_STREAK',
	LoginOneYearStreak = 'LOGIN_ONE_YEAR_STREAK',

	LoginSevenDays = 'LOGIN_SEVEN_DAYS',
	LoginTwoWeeks = 'LOGIN_TWO_WEEKS',
	LoginOneMonth = 'LOGIN_ONE_MONTH',
	LoginOneYear = 'LOGIN_ONE_YEAR',

	FirstCompleteAttempt = 'FIRST_COMPLETE_ATTEMPT',
	TenthCompleteAttempt = 'TENTH_COMPLETE_ATTEMPT',
	HundredthCompleteAttempt = 'HUNDREDTH_COMPLETE_ATTEMPT',

	FirstGoodScore = 'FIRST_GOOD_SCORE',
	TenthGoodScore = 'TENTH_GOOD_SCORE',
	HundredthGoodScore = 'HUNDREDTH_GOOD_SCORE',

	FirstPerfectScore = 'FIRST_PERFECT_SCORE',
	TenthPerfectScore = 'TENTH_PERFECT_SCORE',
	HundredthPerfectScore = 'HUNDREDTH_PERFECT_SCORE',
}

export enum BadgeType {
	Login = 'LOGIN',
	AttemptCount = 'ATTEMPT_COUNT',
	AttemptScore = 'ATTEMPT_SCORE',
}
