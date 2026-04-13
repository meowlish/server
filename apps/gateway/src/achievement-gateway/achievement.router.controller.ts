import { IsPublic } from '../auth/decorators/public.decorator';
import { type AuthenticatedRequest } from '../types/authenticated-request';
import { ACHIEVEMENT_CLIENT } from './constants/achievement';
import { GetUsersBadgesDto } from './dtos/req/get-users-badges.req.dto';
import { FoundBadgesDto } from './dtos/res/found-badges.res.dto';
import { FoundUsersBadgesDto } from './dtos/res/found-users-badges.res.dto';
import {
	Controller,
	Get,
	Inject,
	OnModuleInit,
	Param,
	Query,
	Req,
	SerializeOptions,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { achievement } from '@server/generated';
import { ApiResponseEntity } from '@server/utils';
import { Observable } from 'rxjs';

@ApiTags('Achievements')
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
	@ApiOperation({ summary: 'Get all available badges' })
	@ApiResponseEntity(FoundBadgesDto)
	@SerializeOptions({ type: FoundBadgesDto })
	getAllBadges(): Observable<FoundBadgesDto> {
		return this.achievementService.getAll({});
	}

	@Get('my')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get the authenticated user badges' })
	@ApiResponseEntity(FoundUsersBadgesDto)
	@SerializeOptions({ type: FoundUsersBadgesDto })
	getMyBadges(
		@Query() body: GetUsersBadgesDto,
		@Req() req: AuthenticatedRequest,
	): Observable<FoundUsersBadgesDto> {
		return this.achievementService.getUsersBadges({ ...body, userId: req.user.sub });
	}

	@Get(':uid')
	@IsPublic()
	@ApiOperation({ summary: 'Get badges earned by a specific user' })
	@ApiResponseEntity(FoundUsersBadgesDto)
	@SerializeOptions({ type: FoundUsersBadgesDto })
	getSomeonesBadges(
		@Query() body: GetUsersBadgesDto,
		@Param('uid') uid: string,
	): Observable<FoundUsersBadgesDto> {
		return this.achievementService.getUsersBadges({ ...body, userId: uid });
	}
}
