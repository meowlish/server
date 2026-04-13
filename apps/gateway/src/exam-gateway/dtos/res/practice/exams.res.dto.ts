import { Expose, Type } from 'class-transformer';

class MinimalExamInfoDto {
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

export class ExamsInfoDto {
	@Expose()
	@Type(() => MinimalExamInfoDto)
	exams!: MinimalExamInfoDto[];

	@Expose()
	cursor!: string;
}
