import {
	type IPracticeReadRepository,
	IPracticeReadRepositoryToken,
} from '../../../../domain/repositories/practice.read.repository';
import {
	FindExamsCursor,
	FindExamsQuery,
	FindExamsQueryResult,
} from '../../practice/find-exams.query';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CursorPaginationHelper } from '@server/utils';

@QueryHandler(FindExamsQuery)
export class FindExamsHandler implements IQueryHandler<FindExamsQuery> {
	private readonly cursorPaginationHelper: CursorPaginationHelper;

	constructor(
		@Inject(IPracticeReadRepositoryToken)
		private readonly practiceReadRepository: IPracticeReadRepository,
	) {
		this.cursorPaginationHelper = new CursorPaginationHelper(
			`${process.env.HOST}${process.env.PORT}FindExams`,
		);
	}

	async execute(query: FindExamsQuery): Promise<FindExamsQueryResult> {
		const payload = query.payload;
		const decodedCursor =
			payload.cursor ?
				this.cursorPaginationHelper.decodeCursor<FindExamsCursor>(payload.cursor)
			:	undefined;

		// cursor.filter has precedence
		const inUseFilter = decodedCursor ? decodedCursor.filter : payload.filter;
		// cursor.sortBy has precedence
		const inUseSortBy = decodedCursor ? decodedCursor.sortBy : payload.sortBy;
		// payload.limit has precedence
		const inUseLimit = payload.limit ?? decodedCursor?.limit ?? 10;

		const exams = await this.practiceReadRepository.findExams({
			filter: inUseFilter,
			sortBy: inUseSortBy,
			lastCursor: decodedCursor?.lastCursor,
			limit: inUseLimit,
		});

		const lastExamItem = exams.at(-1);

		const encodedCursor = this.cursorPaginationHelper.encodeCursor<FindExamsCursor>({
			filter: inUseFilter,
			sortBy: inUseSortBy,
			lastCursor:
				lastExamItem ?
					{
						id: lastExamItem.id,
						attemptsCount: lastExamItem.attemptsCount,
						updatedAt: lastExamItem.updatedAt,
					}
				:	undefined,
			limit: inUseLimit,
		});

		return { exams: exams, cursor: encodedCursor };
	}
}
