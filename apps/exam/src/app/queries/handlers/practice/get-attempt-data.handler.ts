import { AttemptSavedData } from '../../../../domain/read-models/attempt-save-data.read-model';
import {
	type IPracticeReadRepository,
	IPracticeReadRepositoryToken,
} from '../../../../domain/repositories/practice.read.repository';
import { GetAttemptDataQuery } from '../../practice/get-attempt-data.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAttemptDataQuery)
export class GetAttemptDataQueryHandler implements IQueryHandler<GetAttemptDataQuery> {
	constructor(
		@Inject(IPracticeReadRepositoryToken)
		private readonly practiceReadRepository: IPracticeReadRepository,
	) {}

	async execute(query: GetAttemptDataQuery): Promise<AttemptSavedData> {
		const payload = query.payload;
		const data = await this.practiceReadRepository.getAttemptSavedData(payload.attemptId);
		return data;
	}
}
