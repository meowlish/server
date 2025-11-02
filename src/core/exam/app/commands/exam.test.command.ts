import { Command } from '@common/abstract/command.class';

export class TestCommandPayload {
	constructor() {}
}

export class TestCommand extends Command<TestCommandPayload> {}
