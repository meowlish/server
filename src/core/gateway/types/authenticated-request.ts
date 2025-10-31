import { Request } from 'express';

import { Claims } from '@common/utils/types/claims.type';

export interface AuthenticatedRequest extends Request {
	user: Claims;
}
