import { Answer } from '@core/exam/domain/entities/question.entity';
import {
	type IExamRepository,
	IExamRepositoryToken,
} from '@core/exam/domain/repositories/exam.repository';
import {
	type IQuestionRepository,
	IQuestionRepositoryToken,
} from '@core/exam/domain/repositories/question.repository';
import { ExamStatus } from '@core/exam/enums/exam-status.enum';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateQuestionCommand } from '../../staff/exam.update-question.command';

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionHandler implements ICommandHandler<UpdateQuestionCommand> {
	constructor(
		@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository,
		@Inject(IQuestionRepositoryToken) private readonly questionRepository: IQuestionRepository,
	) {}

	public async execute(command: UpdateQuestionCommand): Promise<void> {
		const payload = command.payload;
		const question = await this.questionRepository.findOne(payload.id);
		if (!question) throw new NotFoundException('Question not found');
		if ((await this.examRepository.getStatusByQuestionId(question.id)) === ExamStatus.APPROVED)
			throw new ConflictException(
				'The exam this question belongs to is already approved and can no longer be updated.',
			);
		question.updateDetails({
			...payload,
		});
		if (payload.deleteAnswers) {
			payload.deleteAnswers.forEach(a => question.removeAnswer(a.content));
		}
		if (payload.addAnswers) {
			payload.addAnswers.forEach(a =>
				question.addAnswers(new Answer({ content: a.content, isCorrect: a.isCorrect })),
			);
		}
		await this.questionRepository.update(question);
	}
}
