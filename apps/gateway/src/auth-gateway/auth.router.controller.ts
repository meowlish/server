import { IsPublic } from '../auth/decorators/public.decorator';
import { JwtRefreshAuthGuard } from '../auth/guards/jwt-refresh-auth.guard';
import { type AuthenticatedRequest } from '../types/authenticated-request';
import { AUTH_CLIENT } from './constants/auth';
import { LoginMailDto } from './dtos/req/login-mail.req.dto';
import { RegisterMailDto } from './dtos/req/register-mail.req.dto';
import { Body, Controller, Inject, OnModuleInit, Post, Req, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { type ClientGrpc } from '@nestjs/microservices';
import { auth } from '@server/generated';
import { lastValueFrom } from 'rxjs';

@ApiTags('Authentication')
@Controller()
export class AuthGatewayController implements OnModuleInit {
	private authService!: auth.AuthServiceClient;

	constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.authClient.getService<auth.AuthServiceClient>(auth.AUTH_SERVICE_NAME);
	}

	@Post('register')
	@IsPublic()
	@ApiOperation({ summary: 'Register a new user with email and password' })
	@ApiBody({ type: RegisterMailDto })
	@ApiCreatedResponse({ description: 'User successfully registered' })
	register(@Body() body: RegisterMailDto) {
		const res = this.authService.registerMail(body);
		return res;
	}

	@Post('login')
	@HttpCode(200)
	@IsPublic()
	@ApiOperation({ summary: 'Login user with email and password' })
	@ApiBody({ type: LoginMailDto })
	@ApiOkResponse({ description: 'User successfully logged in along with access/refresh tokens' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized / Invalid credentials' })
	login(@Body() body: LoginMailDto) {
		const res = this.authService.loginMail(body);
		return res;
	}

	@Post('refresh')
	@HttpCode(200)
	@UseGuards(JwtRefreshAuthGuard)
	@IsPublic()
	@ApiOperation({ summary: 'Refresh access and refresh tokens using a valid refresh token' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Tokens successfully refreshed' })
	@ApiUnauthorizedResponse({ description: 'Invalid or expired refresh token' })
	refresh(@Req() req: AuthenticatedRequest) {
		const res = this.authService.refresh({ identityId: req.user.sub });
		return res;
	}

	@Post('logout-all')
	@HttpCode(200)
	@ApiOperation({ summary: 'Log out the user from all devices (invalidates all refresh tokens)' })
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Successfully logged out everywhere' })
	async logoutAll(@Req() req: AuthenticatedRequest) {
		await lastValueFrom(this.authService.logOutAll({ identityId: req.user.sub }));
		return null;
	}
}
