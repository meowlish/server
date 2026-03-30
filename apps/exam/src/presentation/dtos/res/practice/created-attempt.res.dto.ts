import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class CreatedAttemptDto implements exam.CreatedAttemptDto {
	@Expose()
	id!: string;
}
