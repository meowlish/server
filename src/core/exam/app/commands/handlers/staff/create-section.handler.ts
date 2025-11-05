import {
	type IExamRepository,
	IExamRepositoryToken,
} from '@core/exam/domain/repositories/exam.repository';
import {
	type ISectionRepository,
	ISectionRepositoryToken,
} from '@core/exam/domain/repositories/section.repository';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateSectionCommand } from '../../staff/exam.create-section.command';

@CommandHandler(CreateSectionCommand)
export class CreateSectionHandler implements ICommandHandler<CreateSectionCommand> {
	constructor(
		@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository,
		@Inject(ISectionRepositoryToken) private readonly sectionRepository: ISectionRepository,
	) {}

	public async execute(command: CreateSectionCommand): Promise<void> {
		const payload = command.payload;
		if (payload.examId) {
			const exam = await this.examRepository.findOne(payload.examId);
			if (!exam) throw new NotFoundException('Exam not found.');
			exam.createSection(payload.index);
		} else if (payload.sectionId) {
			const section = await this.sectionRepository.findOne(payload.sectionId);
			if (!section) throw new NotFoundException('Section not found.');
			section.createSection(payload.index);
		} else throw new ConflictException('Provide either the id of the exam or the parent section.');
	}
}
