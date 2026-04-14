import { ExamStatus } from '../../../enums/exam-status.enum';
import { Command } from '@server/utils';

export class ReviewExamCommandPayload {
	constructor(
		public readonly id: string,
		public readonly status: ExamStatus,
	) {}
}

export class ReviewExamCommand extends Command<ReviewExamCommandPayload> {}
