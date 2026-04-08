import { MinimalAttemptInfo } from '../../../domain/read-models/minimal-attempt.read-model';
import { SortDirection } from '@server/typing';
import { Query } from '@server/utils';

export type GetUsersAttemptHistoryQueryResult = {
	attempts: MinimalAttemptInfo[];
	cursor: string;
};

export type GetUsersAttemptHistoryPayload = {
	cursor?: string;
} & Omit<GetUsersAttemptHistoryCursor, 'lastId'>;

export type GetUsersAttemptHistoryCursor = {
	// high prec
	uid: string;
	examId?: string;
	sortBy?: { key: 'endedAt' | 'startedAt' | 'examId' | 'score'; direction: SortDirection };
	lastId?: string;
	// low prec
	limit?: number;
};

export class GetUsersAttemptHistoryQuery extends Query<
	GetUsersAttemptHistoryQueryResult,
	GetUsersAttemptHistoryPayload
> {}
