import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class DeleteExamDto implements exam.DeleteExamDto {
	@Expose()
	@IsString()
	id!: string;
}
