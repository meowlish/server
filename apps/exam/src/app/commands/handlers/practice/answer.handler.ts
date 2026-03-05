import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../../domain/repositories/attempt.repository';
import { AnswerCommand } from '../../practice/exam.answer.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AnswerCommand)
export class AnswerHandler implements ICommandHandler<AnswerCommand> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
	) {}

	public async execute(command: AnswerCommand): Promise<void> {
		const payload = command.payload;
		const timeStamp = new Date();
		const attempt = await this.attemptRepository.findOne(payload.attemptId);
		if (!attempt) throw new NotFoundException('Attempt not found');
		attempt.answer(payload.questionId, payload.answer, timeStamp);
		await this.attemptRepository.save(attempt);
	}
}
