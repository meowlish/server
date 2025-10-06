import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { DatabaseService } from '@shared/db';

@Injectable()
export class UserService {
	constructor(private db: DatabaseService) {}

	createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.db.user.create({ data });
	}
}
