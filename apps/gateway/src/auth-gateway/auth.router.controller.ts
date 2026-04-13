import { IsPublic } from '../auth/decorators/public.decorator';
import { JwtRefreshAuthGuard } from '../auth/guards/jwt-refresh-auth.guard';
import { type AuthenticatedRequest } from '../types/authenticated-request';
import { AUTH_CLIENT } from './constants/auth';
import { LoginMailDto } from './dtos/req/login-mail.req.dto';
import { RegisterMailDto } from './dtos/req/register-mail.req.dto';
import { ResponseTokensDto } from './dtos/res/auth.res.dto';
import {
	Body,
	Controller,
	Inject,
	OnModuleInit,
	Post,
	Req,
	SerializeOptions,
	UseGuards,
} from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { auth } from '@server/generated';
import { ApiEmptyResponseEntity, ApiResponseEntity } from '@server/utils';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('Auth')
@Controller()
export class AuthGatewayController implements OnModuleInit {
	private authService!: auth.AuthServiceClient;

	constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	@Post('register')
	@IsPublic()
	@ApiOperation({ summary: 'Register with email and password' })
	@ApiResponseEntity(ResponseTokensDto)
	@SerializeOptions({ type: ResponseTokensDto })
	register(@Body() body: RegisterMailDto): Observable<ResponseTokensDto> {
		const res = this.authService.registerMail(body);
		return res;
	}

	@Post('login')
	@IsPublic()
	@ApiOperation({ summary: 'Log in with email and password' })
	@ApiResponseEntity(ResponseTokensDto)
	@SerializeOptions({ type: ResponseTokensDto })
	login(@Body() body: LoginMailDto): Observable<ResponseTokensDto> {
		const res = this.authService.loginMail(body);
		return res;
	}

	@Post('refresh')
	@UseGuards(JwtRefreshAuthGuard)
	@IsPublic()
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Refresh access tokens using a refresh token' })
	@ApiResponseEntity(ResponseTokensDto)
	@SerializeOptions({ type: ResponseTokensDto })
	refresh(@Req() req: AuthenticatedRequest): Observable<ResponseTokensDto> {
		const res = this.authService.refresh({ identityId: req.user.sub });
		return res;
	}

	@Post('logout-all')
	@ApiBearerAuth()
	@ApiEmptyResponseEntity()
	@ApiOperation({ summary: 'Log out from all active sessions' })
	async logoutAll(@Req() req: AuthenticatedRequest) {
		await lastValueFrom(this.authService.logOutAll({ identityId: req.user.sub }));
		return null;
	}
}
