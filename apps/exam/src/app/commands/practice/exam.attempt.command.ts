import { Command } from '@server/utils';

export class AttemptCommandPayload {
	constructor(
		public userId: string,
		public examId: string,
		public options?: {
			duration: number;
			sectionIds: string[];
		},
	) {}
}

export class AttemptCommand extends Command<AttemptCommandPayload> {}
