import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { DeleteExamCommand } from '../../staff/exam.delete-exam.command';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteExamCommand)
export class DeleteExamHandler implements ICommandHandler<DeleteExamCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(command: DeleteExamCommand): Promise<void> {
		const payload = command.payload;
		await this.examRepository.delete(payload.id);
	}
}
