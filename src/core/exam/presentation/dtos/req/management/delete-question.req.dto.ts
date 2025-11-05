import { IsString } from 'class-validator';

import { DeleteQuestionDto as IDeleteQuestionDto } from '@common/generated/exam';

export class DeleteQuestionDto implements IDeleteQuestionDto {
	@IsString()
	id!: string;
}
