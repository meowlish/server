import { Command } from '@server/utils';

export class AssignRoleToCommand extends Command<{ identityId: string; roleId: string }> {}
