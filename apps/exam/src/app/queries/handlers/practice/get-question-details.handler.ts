import { DetailedQuestionInfo } from '../../../../domain/read-models/detailed-question.read-model';
import {
	type IPracticeReadRepository,
	IPracticeReadRepositoryToken,
} from '../../../../domain/repositories/practice.read.repository';
import { GetQuestionDetailsQuery } from '../../practice/get-question-details.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetQuestionDetailsQuery)
export class GetQuestionDetailsQueryHandler implements IQueryHandler<GetQuestionDetailsQuery> {
	constructor(
		@Inject(IPracticeReadRepositoryToken)
		private readonly practiceReadRepository: IPracticeReadRepository,
	) {}

	async execute(query: GetQuestionDetailsQuery): Promise<DetailedQuestionInfo> {
		const payload = query.payload;
		const question = await this.practiceReadRepository.getDetailedQuestionInfo(payload.questionId);
		return question;
	}
}
