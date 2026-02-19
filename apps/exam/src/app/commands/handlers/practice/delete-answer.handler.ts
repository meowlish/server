import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { DeleteAnswerCommand } from '../../practice/exam.delete-answer.command';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteAnswerCommand)
export class DeleteAnswerHandler implements ICommandHandler<DeleteAnswerCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(): Promise<void> {
		return new Promise<void>(() => {
			return;
		});
	}
}
