import { Expose } from 'class-transformer';

export class CreatedSectionDto {
	@Expose()
	id!: string;
}
