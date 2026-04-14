import { Command } from '@server/utils';

export class EndAttemptCommandPayload {
	constructor(public attemptId: string) {}
}

export class EndAttemptCommand extends Command<EndAttemptCommandPayload> {}
