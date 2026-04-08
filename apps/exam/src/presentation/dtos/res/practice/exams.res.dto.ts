import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

class MinimalExamInfo implements exam.Exams_MinimalExamInfo {
	@Expose()
	attemptsCount!: number;

	@Expose()
	description?: string;

	@Expose()
	duration!: number;

	@Expose()
	id!: string;

	@Expose()
	name!: string;

	@Expose()
	tags!: string[];

	@Expose()
	updatedAt!: Date;
}

export class ExamsInfo implements exam.Exams {
	@Expose()
	@Type(() => MinimalExamInfo)
	exams!: MinimalExamInfo[];

	@Expose()
	cursor!: string;
}
