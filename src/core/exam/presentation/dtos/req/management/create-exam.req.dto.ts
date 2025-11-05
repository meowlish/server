import { IsInt, IsPositive, IsString } from 'class-validator';

import { CreateExamDto as ICreateExamDto } from '@common/generated/exam';

export class CreateExamDto implements ICreateExamDto {
	@IsString()
	createdBy!: string;

	@IsString()
	description!: string;

	@IsInt()
	@IsPositive()
	duration!: number;

	@IsString()
	title!: string;
}
