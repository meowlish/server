import { IsString } from 'class-validator';

import { DeleteSectionDto as IDeleteSectionDto } from '@common/generated/exam';

export class DeleteSectionDto implements IDeleteSectionDto {
	@IsString()
	id!: string;
}
