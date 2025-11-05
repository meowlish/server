import { ExamStatus } from '@core/exam/enums/exam-status.enum';

import { Command } from '@common/abstract/command.class';

export class ReviewExamCommandPayload {
	constructor(
		public readonly id: string,
		public readonly status: ExamStatus,
	) {}
}

export class ReviewExamCommand extends Command<ReviewExamCommandPayload> {}
