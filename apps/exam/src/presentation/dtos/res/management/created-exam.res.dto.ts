import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class CreatedExamDto implements exam.CreatedExamDto {
	@Expose()
	id!: string;
}
