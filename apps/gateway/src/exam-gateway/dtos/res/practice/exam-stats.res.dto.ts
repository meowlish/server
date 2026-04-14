import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ExamStatsDto {
	@Expose()
	@ApiProperty({ type: Number })
	averageDuration!: number;

	@Expose()
	@ApiProperty({ type: Number })
	averageScoreInPercentage!: number;

	@Expose()
	@Type(() => QuestionStatsDto)
	@ApiProperty({ type: () => [QuestionStatsDto] })
	questions!: QuestionStatsDto[];
}

class QuestionStatsDto {
	@Expose()
	@ApiProperty({ type: Number })
	correctCount!: number;

	@Expose()
	@ApiProperty({ type: [String] })
	tags!: string[];

	@Expose()
	@ApiProperty({ type: Number })
	totalCount!: number;
}
