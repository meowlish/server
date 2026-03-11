import { exam } from '@server/generated';
import { IsString } from 'class-validator';

export class UpdateTagDto implements exam.UpdateTagDto {
	@IsString()
	name!: string;

	@IsString()
	id!: string;
}
