import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '../../../../domain/repositories/section.repository';
import { DeleteQuestionCommand } from '../../staff/exam.delete-question.command';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler implements ICommandHandler<DeleteQuestionCommand> {
	constructor(
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: DeleteQuestionCommand): Promise<void> {
		const payload = command.payload;
		const parentSection = await this.sectionRepository.getParentSectionOfQuestion(payload.id);
		parentSection.removeQuestion(payload.id);
		await this.sectionRepository.save(parentSection);
	}
}
