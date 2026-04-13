import { Expose, Type } from 'class-transformer';

export class ExamStatsDto {
	@Expose()
	averageDuration!: number;

	@Expose()
	averageScoreInPercentage!: number;

	@Expose()
	@Type(() => QuestionStatsDto)
	questions!: QuestionStatsDto[];
}

class QuestionStatsDto {
	@Expose()
	correctCount!: number;

	@Expose()
	tags!: string[];

	@Expose()
	totalCount!: number;
}
