import { Expose, Type } from 'class-transformer';

export class QuestionDetailDto {
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

class SectionContextDto {
	@Expose()
	content?: string;

	@Expose()
	fileUrls!: string[];
}
