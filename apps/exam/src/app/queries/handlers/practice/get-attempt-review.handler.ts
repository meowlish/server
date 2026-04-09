import { DetailedAttemptReviewData } from '../../../../domain/read-models/attempt-review.read-model';
import {
	type IPracticeReadRepository,
	IPracticeReadRepositoryToken,
} from '../../../../domain/repositories/practice.read.repository';
import { GetAttemptReviewQuery } from '../../practice/get-attempt-review.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAttemptReviewQuery)
export class GetAttemptReviewQueryHandler implements IQueryHandler<GetAttemptReviewQuery> {
	constructor(
		@Inject(IPracticeReadRepositoryToken)
		private readonly practiceReadRepository: IPracticeReadRepository,
	) {}

	async execute(query: GetAttemptReviewQuery): Promise<DetailedAttemptReviewData> {
		const payload = query.payload;
		const review = await this.practiceReadRepository.getAttemptReview(payload.attemptId);
		return review;
	}
}
