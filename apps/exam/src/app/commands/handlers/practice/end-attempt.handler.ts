import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../../domain/repositories/attempt.repository';
import { EndAttemptCommand } from '../../practice/exam.end-attempt.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(EndAttemptCommand)
export class EndAttemptHandler implements ICommandHandler<EndAttemptCommand> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
		private readonly eventBus: EventBus,
	) {}

	public async execute(command: EndAttemptCommand): Promise<void> {
		const payload = command.payload;
		const attempt = await this.attemptRepository.findOne(payload.attemptId);
		if (!attempt) throw new NotFoundException('Attempt not found');
		attempt.endAttempt();
		await this.attemptRepository.save(attempt);
		this.eventBus.publishAll(attempt.getUncommittedEvents());
	}
}
