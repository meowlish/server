import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class DeleteSectionDto implements exam.DeleteSectionDto {
	@Expose()
	@IsString()
	id!: string;
}
