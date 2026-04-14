import {
	type IAttemptRepository,
	IAttemptRepositoryToken,
} from '../../../../domain/repositories/attempt.repository';
import { AddNoteCommand } from '../../practice/exam.add-note.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddNoteCommand)
export class AddNoteHandler implements ICommandHandler<AddNoteCommand> {
	constructor(
		@Inject(IAttemptRepositoryToken) private readonly attemptRepository: IAttemptRepository,
	) {}

	public async execute(command: AddNoteCommand): Promise<void> {
		const payload = command.payload;
		const attempt = await this.attemptRepository.findOne(payload.attemptId);
		if (!attempt) throw new NotFoundException('Attempt not found');
		attempt.addNote(payload.questionId, payload.note);
		await this.attemptRepository.save(attempt);
	}
}
