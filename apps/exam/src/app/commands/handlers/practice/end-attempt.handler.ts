import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { EndAttemptCommand } from '../../practice/exam.end-attempt.command';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(EndAttemptCommand)
export class EndAttemptHandler implements ICommandHandler<EndAttemptCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(): Promise<void> {
		return new Promise<void>(() => {
			return;
		});
	}
}
