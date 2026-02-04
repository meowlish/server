import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import { ReviewExamCommand } from '../../staff/exam.review-exam.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ReviewExamCommand)
export class ReviewExamHandler implements ICommandHandler<ReviewExamCommand> {
	constructor(@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository) {}

	public async execute(command: ReviewExamCommand): Promise<void> {
		const payload = command.payload;
		const exam = await this.examRepository.findOne(payload.id);
		if (!exam) throw new NotFoundException('Exam not found');
		exam.updateStatus(payload.status);
		await this.examRepository.update(exam);
	}
}
