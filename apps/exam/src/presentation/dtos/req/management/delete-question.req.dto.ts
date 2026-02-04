import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class DeleteQuestionDto implements exam.DeleteQuestionDto {
	@IsString()
	id!: string;
}
