import { Expose } from 'class-transformer';

export class GoalResDto {
	@Expose()
	date!: Date | undefined;

	@Expose()
	target!: number;

	@Expose()
	type!: string;

	@Expose()
	uid!: string;
}
