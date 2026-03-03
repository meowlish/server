import { IsPublic } from '../auth/decorators/public.decorator';
import { JwtRefreshAuthGuard } from '../auth/guards/jwt-refresh-auth.guard';
import { type AuthenticatedRequest } from '../types/authenticated-request';
import { AUTH_CLIENT } from './constants/auth';
import { LoginMailDto } from './dtos/req/login-mail.req.dto';
import { RegisterMailDto } from './dtos/req/register-mail.req.dto';
import {
	Body,
	Controller,
	HttpCode,
	Inject,
	OnModuleInit,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
	@ApiBody({ type: RegisterMailDto })
	@ApiCreatedResponse({ description: 'User successfully registered' })
	@ApiOperation({ summary: 'Register a new user with email and password' })
	async register(@Body() body: RegisterMailDto) {
		return await lastValueFrom(this.authService.registerMail(body));
	}

	@Post('login')
	@IsPublic()
	@ApiBody({ type: LoginMailDto })
	@ApiOkResponse({ description: 'User successfully logged in along with access/refresh tokens' })
	@ApiOperation({ summary: 'Login user with email and password' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized / Invalid credentials' })
	@HttpCode(200)
	async login(@Body() body: LoginMailDto) {
		return await lastValueFrom(this.authService.loginMail(body));
	}

	@Post('refresh')
	@UseGuards(JwtRefreshAuthGuard)
	@IsPublic()
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Tokens successfully refreshed' })
	@ApiOperation({ summary: 'Refresh access and refresh tokens using a valid refresh token' })
	@ApiUnauthorizedResponse({ description: 'Invalid or expired refresh token' })
	@HttpCode(200)
	async refresh(@Req() req: AuthenticatedRequest) {
		return await lastValueFrom(this.authService.refresh({ identityId: req.user.sub }));
	}

	@Post('logout-all')
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Successfully logged out everywhere' })
	@ApiOperation({ summary: 'Log out the user from all devices (invalidates all refresh tokens)' })
	@HttpCode(200)
	async logoutAll(@Req() req: AuthenticatedRequest) {
		await lastValueFrom(this.authService.logOutAll({ identityId: req.user.sub }));
		return null;
	}
}
