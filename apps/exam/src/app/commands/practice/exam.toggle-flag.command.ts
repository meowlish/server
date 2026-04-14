import { Command } from '@server/utils';

export class ToggleFlagCommandPayload {
	constructor(
		public attemptId: string,
		public questionId: string,
	) {}
}

export type ToggleFlagCommandResult = {
	state: boolean;
};

export class ToggleFlagCommand extends Command<ToggleFlagCommandPayload, ToggleFlagCommandResult> {}
