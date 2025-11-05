import { IsString } from 'class-validator';

import { DeleteExamDto as IDeleteExamDto } from '@common/generated/exam';

export class DeleteExamDto implements IDeleteExamDto {
	@IsString()
	id!: string;
}
