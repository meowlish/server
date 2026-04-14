import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNumber, IsString } from 'class-validator';

export class UpdateGoalDto {
	@Type(() => Date)
	@IsDate()
	@ApiProperty({ type: String, format: 'date-time' })
	date!: Date;

	@IsNumber()
	@ApiProperty({ type: Number })
	target!: number;

	@IsIn(['IELTS', 'TOEIC', 'VSTEP', 'TOEFL'])
	@IsString()
	@ApiProperty({ enum: ['IELTS', 'TOEIC', 'VSTEP', 'TOEFL'] })
	type!: string;
}
