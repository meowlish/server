import { Expose } from 'class-transformer';

export class CreatedExamDto {
	@Expose()
	id!: string;
}
