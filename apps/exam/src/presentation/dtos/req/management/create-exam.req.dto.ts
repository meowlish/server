import { exam } from '@server/generated';
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsPositive, IsString } from 'class-validator';

@Exclude()
export class CreateExamDto implements exam.CreateExamDto {
	@Expose()
	@IsString()
	createdBy!: string;

	@Expose()
	@IsString()
	description!: string;

	@Expose()
	@IsInt()
	@IsPositive()
	duration!: number;

	@Expose()
	@IsString()
	title!: string;
}
