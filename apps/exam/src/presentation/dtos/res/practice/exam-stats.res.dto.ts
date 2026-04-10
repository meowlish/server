import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class ExamStatsDto implements exam.ExamStatistics {
	@Expose()
	averageDuration!: number;

	@Expose()
	averageScoreInPercentage!: number;

	@Expose()
	@Type(() => QuestionStatsDto)
	questions!: QuestionStatsDto[];
}

class QuestionStatsDto implements exam.ExamStatistics_QuestionStatistics {
	@Expose()
	correctCount!: number;

	@Expose()
	tags!: string[];

	@Expose()
	totalCount!: number;
}
