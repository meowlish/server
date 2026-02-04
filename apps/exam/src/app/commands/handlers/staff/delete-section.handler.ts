import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '../../../../domain/repositories/section.repository';
import { ExamStatus } from '../../../../enums/exam-status.enum';
import { DeleteSectionCommand } from '../../staff/exam.delete-section.command';
import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteSectionCommand)
export class DeleteSectionHandler implements ICommandHandler<DeleteSectionCommand> {
	constructor(
		@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository,
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: DeleteSectionCommand): Promise<void> {
		const payload = command.payload;
		if ((await this.examRepository.getStatusBySectionId(payload.id)) === ExamStatus.APPROVED)
			throw new ConflictException(
				'The exam this section belongs to is already approved and can no longer be updated.',
			);
		await this.sectionRepository.delete(payload.id);
	}
}
