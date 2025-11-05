import { Exam } from '@core/exam/domain/entities/exam.entity';
import {
	type IExamRepository,
	IExamRepositoryToken,
} from '@core/exam/domain/repositories/exam.repository';
import { ExamStatus } from '@core/exam/enums/exam-status.enum';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateExamCommand } from '../../staff/exam.create-exam.command';

@CommandHandler(CreateExamCommand)
export class CreateExamHandler implements ICommandHandler<CreateExamCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(command: CreateExamCommand): Promise<void> {
		const payload = command.payload;
		const exam = new Exam({
			...payload,
			sections: [],
			status: ExamStatus.PENDING,
		});
		await this.examRepository.create(exam);
	}
}
