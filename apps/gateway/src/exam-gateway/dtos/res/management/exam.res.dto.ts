import { Expose } from 'class-transformer';

export class ExamDetailedManagementInfoDto {
	@Expose()
	createdAt!: Date;

	@Expose()
	createdBy!: string;

	@Expose()
	description?: string;

	@Expose()
	duration!: number;

	@Expose()
	id!: string;

	@Expose()
	sectionIds!: string[];

	@Expose()
	status!: string;

	@Expose()
	tags!: string[];

	@Expose()
	title!: string;

	@Expose()
	updatedAt!: Date;
}
