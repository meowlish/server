import { Command } from '@server/utils';

export class LogoutAllCommandPayload {
	constructor(public readonly identityId: string) {}
}

export class LogoutAllCommand extends Command<LogoutAllCommandPayload> {}
