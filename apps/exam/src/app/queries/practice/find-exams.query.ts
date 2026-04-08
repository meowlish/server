import { MinimalExamInfo } from '../../../domain/read-models/minimal-exam.read-model';
import { SortDirection } from '@server/typing';
import { Query } from '@server/utils';

export type FindExamsQueryResult = {
	exams: MinimalExamInfo[];
	cursor: string;
};

export type FindExamsPayload = {
	cursor?: string;
} & Omit<FindExamsCursor, 'lastCursor'>;

export type FindExamsCursor = {
	// high prec
	filter?: { name?: string; tags?: string[] };
	sortBy?: { key: 'attemptsCount' | 'updatedAt'; direction: SortDirection };
	lastCursor?: {
		id: string;
		attemptsCount?: number;
		updatedAt?: Date;
	};
	// low prec
	limit?: number;
};

export class FindExamsQuery extends Query<FindExamsQueryResult, FindExamsPayload> {}
