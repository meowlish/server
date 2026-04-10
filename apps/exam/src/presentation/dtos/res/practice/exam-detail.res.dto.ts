import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class ExamDetail implements exam.DetailedExamInfo {
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
	@Type(() => Section)
	sections!: Section[];

	@Expose()
	tags!: string[];

	@Expose()
	updatedAt!: Date;
}

class Section implements exam.DetailedExamInfo_DetailedExamSection {
	@Expose()
	id!: string;

	@Expose()
	name?: string;

	@Expose()
	questionsCount!: number;

	@Expose()
	tags!: string[];
}
