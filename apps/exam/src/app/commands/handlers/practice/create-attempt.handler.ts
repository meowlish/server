import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { CreateAttemptCommand } from '../../practice/exam.create-attempt.command';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateAttemptCommand)
export class CreateAttemptHandler implements ICommandHandler<CreateAttemptCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(): Promise<void> {
		return new Promise<void>(() => {
			return;
		});
	}
}
