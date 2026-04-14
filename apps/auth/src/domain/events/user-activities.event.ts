import { Event } from '@server/utils';

export class UserLoggedInEvent extends Event<{ uid: string; date: Date }> {}
