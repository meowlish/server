import { Command } from '@server/utils';

export class AttemptCommandPayload {
	constructor(
		public userId: string,
		public examId: string,
		public attemptId: string,
		public questionId: string,
		public options: {
			isStrict: boolean;
			duration: number;
			sectionIds: string[];
		},
	) {}
}

export class AttemptCommand extends Command<AttemptCommandPayload> {}
