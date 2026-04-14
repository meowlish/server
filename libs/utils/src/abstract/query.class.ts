import { Query as CqrsQuery } from '@nestjs/cqrs';

export class Query<TResult, TPayload = void> extends CqrsQuery<TResult> {
	constructor(public readonly payload: TPayload) {
		super();
	}
}
