import { Choice } from '../../../../domain/entities/question.entity';
import {
	type IExamRepository,
	IExamRepositoryToken,
} from '../../../../domain/repositories/exam.repository';
import {
	type IQuestionRepository,
	IQuestionRepositoryToken,
} from '../../../../domain/repositories/question.repository';
import { UpdateQuestionCommand } from '../../staff/exam.update-question.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
		question.updateDetails({
			...payload,
		});
		if (payload.deleteChoicesIds) {
			payload.deleteChoicesIds.forEach(id => question.removeChoice(id));
		}
		if (payload.addChoices) {
			payload.addChoices.forEach(c =>
				question.addChoice(new Choice({ key: c.key, content: c.content, isCorrect: c.isCorrect })),
			);
		}
		if (payload.updateChoices) {
			payload.updateChoices.forEach(c => question.updateChoice(c.id, c));
		}
		await this.questionRepository.save(question);
	}
}
