import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class DeleteTagDto implements exam.DeleteTagDto {
	@IsString()
	id!: string;
}
