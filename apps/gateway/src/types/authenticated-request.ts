import { Claims } from '@server/utils';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
	user: Claims;
}
