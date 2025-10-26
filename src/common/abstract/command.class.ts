import { Command as CqrsCommand } from '@nestjs/cqrs';

export class Command<TPayload, TResult = void> extends CqrsCommand<TResult> {
	constructor(public readonly payload: TPayload) {
		super();
	}
}
