import { IsPublic } from '../auth/decorators/public.decorator';
import { type AuthenticatedRequest } from '../types/authenticated-request';
import { ACHIEVEMENT_CLIENT } from './constants/achievement';
import { GetUsersBadgesDto } from './dtos/req/get-users-badges.req.dto';
import { FoundBadgesDto } from './dtos/res/found-badges.res.dto';
import { FoundUsersBadgesDto } from './dtos/res/found-users-badges.res.dto';
import {
	Body,
	Controller,
	Get,
	Inject,
	OnModuleInit,
	Param,
	Req,
	SerializeOptions,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { achievement } from '@server/generated';
import { Observable } from 'rxjs';

@Controller('badges')
export class AchievementGatewayController implements OnModuleInit {
	private achievementService!: achievement.AchievementServiceClient;

	constructor(@Inject(ACHIEVEMENT_CLIENT) private readonly achievementClient: ClientGrpc) {}

	onModuleInit() {
		this.achievementService =
			this.achievementClient.getService<achievement.AchievementServiceClient>(
				achievement.ACHIEVEMENT_SERVICE_NAME,
			);
	}

	@Get()
	@IsPublic()
	@SerializeOptions({ type: FoundBadgesDto })
	getAllBadges(): Observable<FoundBadgesDto> {
		return this.achievementService.getAll({});
	}

	@Get('my')
	@SerializeOptions({ type: FoundUsersBadgesDto })
	getMyBadges(
		@Body() body: GetUsersBadgesDto,
		@Req() req: AuthenticatedRequest,
	): Observable<FoundUsersBadgesDto> {
		return this.achievementService.getUsersBadges({ ...body, userId: req.user.sub });
	}

	@Get(':uid')
	@IsPublic()
	@SerializeOptions({ type: FoundUsersBadgesDto })
	getSomeonesBadges(
		@Body() body: GetUsersBadgesDto,
		@Param('uid') uid: string,
	): Observable<FoundUsersBadgesDto> {
		return this.achievementService.getUsersBadges({ ...body, userId: uid });
	}
}
