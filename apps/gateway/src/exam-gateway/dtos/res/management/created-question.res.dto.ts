import { Expose } from 'class-transformer';

export class CreatedQuestionDto {
	@Expose()
	id!: string;
}
