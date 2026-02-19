import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { FlagCommand } from '../../practice/exam.flag.command';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(FlagCommand)
export class FlagHandler implements ICommandHandler<FlagCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(): Promise<void> {
		return new Promise<void>(() => {
			return;
		});
	}
}
