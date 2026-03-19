import { Exam } from '../../../../domain/entities/exam.entity';
import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { ExamStatus } from '../../../../enums/exam-status.enum';
import { CreateExamCommand } from '../../staff/exam.create-exam.command';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateExamCommand)
export class CreateExamHandler implements ICommandHandler<CreateExamCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(command: CreateExamCommand): Promise<void> {
		const payload = command.payload;
		const exam = new Exam({
			...payload,
			sections: [],
			status: ExamStatus.Pending,
		});
		await this.examRepository.save(exam);
	}
}
