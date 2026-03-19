import { IntegrationEvent } from '@server/utils';

export class UserLoggedInIntegrationEvent extends IntegrationEvent<{ uid: string; date: Date }>() {}
