import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '../../../../domain/repositories/section.repository';
import { DeleteSectionCommand } from '../../staff/exam.delete-section.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteSectionCommand)
export class DeleteSectionHandler implements ICommandHandler<DeleteSectionCommand> {
	constructor(
		@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository,
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: DeleteSectionCommand): Promise<void> {
		const payload = command.payload;
		try {
			await this.removeFromParentSection(payload.id);
		} catch (e) {
			if (e instanceof NotFoundException) await this.removeFromParentExam(payload.id);
			else throw e;
		}
	}

	private async removeFromParentSection(sectionId: string): Promise<void> {
		const parent = await this.sectionRepository.getParentSectionOfSection(sectionId);
		if (!parent) throw new NotFoundException('Parent section not found');
		parent.removeSection(sectionId);
		await this.sectionRepository.save(parent);
	}

	private async removeFromParentExam(sectionId: string): Promise<void> {
		const parent = await this.examRepository.getParentExamOfSection(sectionId);
		parent.removeSection(sectionId);
		await this.examRepository.save(parent);
	}
}
