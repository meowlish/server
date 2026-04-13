import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNumber, IsString } from 'class-validator';

export class UpdateGoalDto {
	@Type(() => Date)
	@IsDate()
	date!: Date;

	@IsNumber()
	target!: number;

	@IsIn(['IELTS', 'TOEIC', 'VSTEP', 'TOEFL'])
	@IsString()
	type!: string;
}
