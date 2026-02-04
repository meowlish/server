import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '../../../../domain/repositories/section.repository';
import { ExamStatus } from '../../../../enums/exam-status.enum';
import { MoveSectionCommand } from '../../staff/exam.move-section.command';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MoveSectionCommand)
export class MoveSectionHandler implements ICommandHandler<MoveSectionCommand> {
	constructor(
		@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository,
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: MoveSectionCommand): Promise<void> {
		const { parentId, id: sectionId, index, toRoot } = command.payload;

		// can only update when exam is not approved
		if ((await this.examRepository.getStatusBySectionId(sectionId)) === ExamStatus.APPROVED)
			throw new ConflictException(
				'The exam this section belongs to is already approved and can no longer be moved.',
			);
		// move to new section
		if (parentId) {
			// can only move to section in the exam
			const newParentSection = await this.sectionRepository.findOneInTheSameExamAsSection(
				parentId,
				sectionId,
			);
			if (!newParentSection) throw new NotFoundException('Section not found');
			newParentSection.addSection(sectionId, index);
			return await this.sectionRepository.update(newParentSection);
		}
		// move to root (child of exam)
		else if (toRoot) {
			const exam = await this.examRepository.getParentExamOfSection(sectionId);
			exam.addSection(sectionId, index);
			return await this.examRepository.update(exam);
		}
		// move within existing parent container
		else {
			// check to see if parent is exam or section
			const parentSection = await this.sectionRepository.getParentSectionOfSection(sectionId);
			if (!parentSection) {
				const exam = await this.examRepository.getParentExamOfSection(sectionId);
				exam.moveSection(sectionId, index);
				return await this.examRepository.update(exam);
			} else {
				parentSection.moveChild(sectionId, index);
				return await this.sectionRepository.update(parentSection);
			}
		}
	}
}
