import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../../domain/repositories/attempt.repository';
import { RemoveAnswerCommand } from '../../practice/exam.remove-answer.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveAnswerCommand)
export class RemoveAnswerHandler implements ICommandHandler<RemoveAnswerCommand> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
	) {}

	public async execute(command: RemoveAnswerCommand): Promise<void> {
		const payload = command.payload;
		const timeStamp = new Date();
		const attempt = await this.attemptRepository.findOne(payload.attemptId);
		if (!attempt) throw new NotFoundException('Attempt not found');
		if (payload.answer) attempt.deleteAnswer(payload.questionId, payload.answer, timeStamp);
		else attempt.deleteAnswer(payload.questionId, timeStamp);
		await this.attemptRepository.save(attempt);
	}
}
