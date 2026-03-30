import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '../../../../domain/repositories/section.repository';
import {
	CreateQuestionCommand,
	CreateQuestionCommandResult,
} from '../../staff/exam.create-question.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {
	constructor(
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: CreateQuestionCommand): Promise<CreateQuestionCommandResult> {
		const payload = command.payload;
		const section = await this.sectionRepository.findOne(payload.sectionId);
		if (!section) throw new NotFoundException('Section not found.');
		const questionId = section.createQuestion(payload.index);
		await this.sectionRepository.save(section);
		return { id: questionId };
	}
}
