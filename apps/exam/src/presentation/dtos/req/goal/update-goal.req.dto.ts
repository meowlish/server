import { exam } from '@server/generated';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNumber, IsString } from 'class-validator';

export class UpdateGoalDto implements exam.UpdateGoalDto {
	@IsString()
	uid!: string;

	@Type(() => Date)
	@IsDate()
	date!: Date;

	@IsNumber()
	target!: number;

	@IsIn(['IELTS', 'TOEIC', 'VSTEP', 'TOEFL'])
	@IsString()
	type!: string;
}
