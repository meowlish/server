import { AuthenticatedRequest } from '../types/authenticated-request';
import { EXAM_CLIENT } from './constants/exam';
import { SetGoalDto } from './dtos/req/goal/set-goal.req.dto';
import { UpdateGoalDto } from './dtos/req/goal/update-goal.req.dto';
import { GoalResDto } from './dtos/res/goal/goal.res.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	OnModuleInit,
	Patch,
	Post,
	Req,
	SerializeOptions,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { exam } from '@server/generated';

@Controller('goals')
export class GoalGatewayController implements OnModuleInit {
	private goalService!: exam.GoalServiceClient;

	constructor(@Inject(EXAM_CLIENT) private readonly examClient: ClientGrpc) {}

	onModuleInit() {
		this.goalService = this.examClient.getService<exam.GoalServiceClient>(exam.GOAL_SERVICE_NAME);
	}

	@Post('my')
	@SerializeOptions({ type: GoalResDto })
	setGoal(@Body() body: SetGoalDto, @Req() request: AuthenticatedRequest) {
		const res = this.goalService.setGoal({ uid: request.user.sub, ...body });
		return res;
	}

	@Delete('my')
	deleteGoal(@Req() request: AuthenticatedRequest) {
		const res = this.goalService.deleteGoal({ uid: request.user.sub });
		return res;
	}

	@Patch('my')
	@SerializeOptions({ type: GoalResDto })
	updateGoal(@Body() body: UpdateGoalDto, @Req() request: AuthenticatedRequest) {
		const res = this.goalService.updateGoal({ uid: request.user.sub, ...body });
		return res;
	}

	@Get('my')
	@SerializeOptions({ type: GoalResDto })
	getGoal(@Req() request: AuthenticatedRequest) {
		const res = this.goalService.getGoal({ uid: request.user.sub });
		return res;
	}
}
