import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '../../../../domain/repositories/section.repository';
import { UpdateSectionCommand } from '../../staff/exam.update-section.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateSectionCommand)
export class UpdateSectionHandler implements ICommandHandler<UpdateSectionCommand> {
	constructor(
		@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository,
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: UpdateSectionCommand): Promise<void> {
		const payload = command.payload;
		const section = await this.sectionRepository.findOne(payload.id);
		if (!section) throw new NotFoundException('Section not found');
		section.updateDetails(payload);
		await this.sectionRepository.save(section);
	}
}
