import { Expose, Type } from 'class-transformer';

export class ExamDetailDto {
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
	@Type(() => SectionDto)
	sections!: SectionDto[];

	@Expose()
	tags!: string[];

	@Expose()
	updatedAt!: Date;
}

class SectionDto {
	@Expose()
	id!: string;

	@Expose()
	name?: string;

	@Expose()
	questionsCount!: number;

	@Expose()
	tags!: string[];
}
