import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class ExamStats implements exam.ExamStatistics {
	@Expose()
	averageDuration!: number;

	@Expose()
	averageScoreInPercentage!: number;

	@Expose()
	@Type(() => QuestionStats)
	questions!: QuestionStats[];
}

class QuestionStats implements exam.ExamStatistics_QuestionStatistics {
	@Expose()
	correctCount!: number;

	@Expose()
	tags!: string[];

	@Expose()
	totalCount!: number;
}
