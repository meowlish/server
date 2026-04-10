import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class QuestionDetail implements exam.DetailedQuestionInfo {
	@Expose()
	content!: string;

	@Expose()
	explanation!: string;

	@Expose()
	fileUrls!: string[];

	@Expose()
	id!: string;

	@Expose()
	points!: number;

	@Expose()
	@Type(() => SectionContext)
	sectionContext!: SectionContext[];

	@Expose()
	type!: string;
}

class SectionContext implements exam.DetailedQuestionInfo_SectionContext {
	@Expose()
	content?: string;

	@Expose()
	fileUrls!: string[];
}
