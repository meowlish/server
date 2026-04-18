import { GetBadgesQuery } from '../../app/queries/achievement.get-badges.query';
import { GetUsersBadgesQuery } from '../../app/queries/achievement.get-users-badges.query';
import { GetUsersBadgesDto } from '../dtos/req/get-users-badges.req.dto';
import { FoundBadgesDto } from '../dtos/res/found-badges.res.dto';
import { FoundUsersBadgesDto } from '../dtos/res/found-users-badges.res.dto';
import { Controller, SerializeOptions } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { achievement } from '@server/generated';

@achievement.AchievementServiceControllerMethods()
@Controller()
export class BadgeController implements achievement.AchievementServiceController {
	constructor(private readonly queryBus: QueryBus) {}

	@SerializeOptions({ type: FoundBadgesDto })
	async getAll(): Promise<FoundBadgesDto> {
		return await this.queryBus.execute(new GetBadgesQuery());
	}

	@SerializeOptions({ type: FoundUsersBadgesDto })
	async getUsersBadges(@Payload() request: GetUsersBadgesDto): Promise<FoundUsersBadgesDto> {
		return await this.queryBus.execute(new GetUsersBadgesQuery(request));
	}
}
