import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '../../../../domain/repositories/section.repository';
import { ExamStatus } from '../../../../enums/exam-status.enum';
import { MoveQuestionCommand } from '../../staff/exam.move-question.command';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MoveQuestionCommand)
export class MoveQuestionHandler implements ICommandHandler<MoveQuestionCommand> {
	constructor(
		@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository,
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: MoveQuestionCommand): Promise<void> {
		const payload = command.payload;
		// can only update when exam is not approved
		if ((await this.examRepository.getStatusByQuestionId(payload.id)) === ExamStatus.APPROVED)
			throw new ConflictException(
				'The exam this question belongs to is already approved and can no longer be moved.',
			);
		if (payload.sectionId) {
			// get the destination section (must be in the same exam)
			const section = await this.sectionRepository.findOneInTheSameExamAsQuestion(
				payload.sectionId,
				payload.id,
			);
			if (!section) throw new NotFoundException('Destination section not found.');
			section.addQuestion(payload.id, payload.index);
			await this.sectionRepository.update(section);
		} else {
			// get the current parent section
			const section = await this.sectionRepository.getParentSectionOfQuestion(payload.id);
			if (!section) throw new NotFoundException('Destination section not found.');
			section.moveChild(payload.id, payload.index);
			await this.sectionRepository.update(section);
		}
	}
}
