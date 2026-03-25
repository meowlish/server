import { IsPublic } from '../auth/decorators/public.decorator';
import { JwtRefreshAuthGuard } from '../auth/guards/jwt-refresh-auth.guard';
import { type AuthenticatedRequest } from '../types/authenticated-request';
import { AUTH_CLIENT } from './constants/auth';
import { LoginMailDto } from './dtos/req/login-mail.req.dto';
import { RegisterMailDto } from './dtos/req/register-mail.req.dto';
import { ResponseAuthDto } from './dtos/res/auth.res.dto';
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
import { auth } from '@server/generated';
import { Observable, lastValueFrom } from 'rxjs';

@Controller()
export class AuthGatewayController implements OnModuleInit {
	private authService!: auth.AuthServiceClient;

	constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	@Post('register')
	@IsPublic()
	@SerializeOptions({ type: ResponseAuthDto })
	register(@Body() body: RegisterMailDto): Observable<ResponseAuthDto> {
		const res = this.authService.registerMail(body);
		return res;
	}

	@Post('login')
	@IsPublic()
	@SerializeOptions({ type: ResponseAuthDto })
	login(@Body() body: LoginMailDto): Observable<ResponseAuthDto> {
		const res = this.authService.loginMail(body);
		return res;
	}

	@Post('refresh')
	@UseGuards(JwtRefreshAuthGuard)
	@IsPublic()
	@SerializeOptions({ type: ResponseAuthDto })
	refresh(@Req() req: AuthenticatedRequest): Observable<ResponseAuthDto> {
		const res = this.authService.refresh({ identityId: req.user.sub });
		return res;
	}

	@Post('logout-all')
	async logoutAll(@Req() req: AuthenticatedRequest) {
		await lastValueFrom(this.authService.logOutAll({ identityId: req.user.sub }));
		return null;
	}
}
