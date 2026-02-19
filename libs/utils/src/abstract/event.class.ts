export class Event<TPayload = void> {
	constructor(public readonly payload: TPayload) {}
}
