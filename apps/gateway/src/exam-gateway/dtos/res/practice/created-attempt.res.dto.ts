import { Expose } from 'class-transformer';

export class CreatedAttemptDto {
	@Expose()
	id!: string;
}
