import { exam } from '@server/generated';
import { Expose } from 'class-transformer';

export class AddedTagDto implements exam.AddedTagDto {
	@Expose()
	id!: string;
}
