import { FileService } from '../../app/services/file.service';
import { GetPresignedUrlDto } from '../dtos/req/get-presigned-url.req.dto';
import { Body, Controller, Post } from '@nestjs/common';

Controller();
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	async getPresignedUrl(@Body() body: GetPresignedUrlDto) {
		return await this.fileService.getPresignedUrl(body);
	}
}
