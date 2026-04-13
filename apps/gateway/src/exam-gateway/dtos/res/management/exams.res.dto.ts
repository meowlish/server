import { Expose, Type } from 'class-transformer';

class ExamDto {
	@Expose()
	createdAt!: Date;

	@Expose()
	createdBy!: string;

	@Expose()
	id!: string;

	@Expose()
	status!: string;

	@Expose()
	title!: string;

	@Expose()
	updatedAt!: Date;
}

export class ExamsManagementInfoDto {
	@Expose()
	@Type(() => ExamDto)
	exams!: ExamDto[];

	@Expose()
	cursor!: string;
}
