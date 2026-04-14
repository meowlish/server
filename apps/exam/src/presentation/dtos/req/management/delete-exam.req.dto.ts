import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class DeleteExamDto implements exam.DeleteExamDto {
	@IsString()
	id!: string;
}
