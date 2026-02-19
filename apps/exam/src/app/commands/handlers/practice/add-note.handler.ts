import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { AddNoteCommand } from '../../practice/exam.add-note.command';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddNoteCommand)
export class AddNoteHandler implements ICommandHandler<AddNoteCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(): Promise<void> {
		return new Promise<void>(() => {
			return;
		});
	}
}
