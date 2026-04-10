import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

class Exam implements exam.FoundExamsForManagement_ExamManagementMinimalInfo {
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

export class ExamsManagementInfo implements exam.FoundExamsForManagement {
	@Expose()
	@Type(() => Exam)
	exams!: Exam[];

	@Expose()
	cursor!: string;
}
