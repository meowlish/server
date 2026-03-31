import { Expose } from 'class-transformer';

export class AddedTagDto {
	@Expose()
	id!: string;
}
