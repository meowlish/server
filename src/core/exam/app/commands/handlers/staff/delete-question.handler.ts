import {
	type IExamRepository,
	IExamRepositoryToken,
} from '@core/exam/domain/repositories/exam.repository';
import {
	type IQuestionRepository,
	IQuestionRepositoryToken,
} from '@core/exam/domain/repositories/question.repository';
import { ExamStatus } from '@core/exam/enums/exam-status.enum';
import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteQuestionCommand } from '../../staff/exam.delete-question.command';

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler implements ICommandHandler<DeleteQuestionCommand> {
	constructor(
		@Inject(IExamRepositoryToken) private readonly examRepository: IExamRepository,
		@Inject(IQuestionRepositoryToken) private readonly questionRepository: IQuestionRepository,
	) {}

	public async execute(command: DeleteQuestionCommand): Promise<void> {
		const payload = command.payload;
		if ((await this.examRepository.getStatusByQuestionId(payload.id)) === ExamStatus.APPROVED)
			throw new ConflictException(
				'The exam this question belongs to is already approved and can no longer be updated.',
			);
		await this.questionRepository.delete(payload.id);
	}
}
