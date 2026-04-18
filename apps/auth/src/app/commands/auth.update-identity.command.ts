import { Command } from '@server/utils';

export class UpdateIdentityCommand extends Command<{ identityId: string; username: string }> {}
