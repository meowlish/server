import { Body, Controller, Post, Version } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CreateUserDto, ResponseUserDto } from '../dto';
import { UserService } from '../providers';

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Version('1')
	@Post('test')
	async profile(@Body() body: CreateUserDto): Promise<ResponseUserDto> {
		const profile = await this.userService.createUser(body);
		return plainToClass(ResponseUserDto, profile);
	}
}
