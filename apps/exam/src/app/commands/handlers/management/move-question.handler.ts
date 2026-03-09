import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '../../../../domain/repositories/section.repository';
import { MoveQuestionCommand } from '../../staff/exam.move-question.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MoveQuestionCommand)
export class MoveQuestionHandler implements ICommandHandler<MoveQuestionCommand> {
	constructor(
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: MoveQuestionCommand): Promise<void> {
		const payload = command.payload;
		if (payload.sectionId) {
			// get the destination section (must be in the same exam)
			const section = await this.sectionRepository.findOneInTheSameExamAsQuestion(
				payload.sectionId,
				payload.id,
			);
			if (!section) throw new NotFoundException('Destination section not found.');
			section.addQuestion(payload.id, payload.index);
			await this.sectionRepository.save(section);
		} else {
			// get the current parent section
			const section = await this.sectionRepository.getParentSectionOfQuestion(payload.id);
			if (!section) throw new NotFoundException('Destination section not found.');
			section.moveChild(payload.id, payload.index);
			await this.sectionRepository.save(section);
		}
	}
}
