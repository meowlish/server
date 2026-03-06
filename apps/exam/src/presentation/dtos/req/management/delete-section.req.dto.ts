import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class DeleteSectionDto implements exam.DeleteSectionDto {
	@IsString()
	id!: string;
}
