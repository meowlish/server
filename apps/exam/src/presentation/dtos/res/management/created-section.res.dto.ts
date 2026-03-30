import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class CreatedSectionDto implements exam.CreatedSectionDto {
	@Expose()
	id!: string;
}
