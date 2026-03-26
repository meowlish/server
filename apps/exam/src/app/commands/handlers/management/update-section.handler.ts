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
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: UpdateSectionCommand): Promise<void> {
		const payload = command.payload;
		const section = await this.sectionRepository.findOne(payload.id);
		if (!section) throw new NotFoundException('Section not found');
		section.updateDetails(payload);
		if (payload.addTags) payload.addTags.forEach(t => section.addTag(t));
		if (payload.removeTags) payload.removeTags.forEach(t => section.removeTag(t));
		if (payload.addFiles) payload.addFiles.forEach(t => section.addFile(t));
		if (payload.removeFiles) payload.removeFiles.forEach(t => section.removeFile(t));
		await this.sectionRepository.save(section);
	}
}
