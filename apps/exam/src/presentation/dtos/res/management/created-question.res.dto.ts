import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class CreatedQuestionDto implements exam.CreatedQuestionDto {
	@Expose()
	id!: string;
}
