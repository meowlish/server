import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { DeleteExamCommand } from '../../staff/exam.delete-exam.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteExamCommand)
export class DeleteExamHandler implements ICommandHandler<DeleteExamCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(command: DeleteExamCommand): Promise<void> {
		const payload = command.payload;
		const exam = await this.examRepository.findOne(payload.id);
		if (!exam) throw new NotFoundException('Exam not found');
		await this.examRepository.delete(exam);
	}
}
