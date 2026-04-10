import { exam } from '@server/generated';
import { Expose, Type } from 'class-transformer';

export class QuestionDetailDto implements exam.DetailedQuestionInfo {
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
	@Type(() => SectionContextDto)
	sectionContext!: SectionContextDto[];

	@Expose()
	type!: string;
}

class SectionContextDto implements exam.DetailedQuestionInfo_SectionContext {
	@Expose()
	content?: string;

	@Expose()
	fileUrls!: string[];
}
