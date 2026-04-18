import { Command } from '@server/utils';

export class RemoveRoleFromCommand extends Command<{ identityId: string; roleId: string }> {}
