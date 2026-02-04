import { Query as CqrsQuery } from '@nestjs/cqrs';

export class Query<TResult> extends CqrsQuery<TResult> {
	constructor() {
		super();
	}
}
