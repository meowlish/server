import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class DeleteQuestionDto implements exam.DeleteQuestionDto {
	@Expose()
	@IsString()
	id!: string;
}
