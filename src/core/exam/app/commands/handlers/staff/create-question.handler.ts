import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '@core/exam/domain/repositories/section.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateQuestionCommand } from '../../staff/exam.create-question.command';

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {
	constructor(
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: CreateQuestionCommand): Promise<void> {
		const payload = command.payload;
		const section = await this.sectionRepository.findOne(payload.sectionId);
		if (!section) throw new NotFoundException('Section not found.');
		section.createQuestion(payload.index);
	}
}
