import { FileService } from '../../app/services/file.service';
import { GetPresignedUrlDto } from '../dtos/req/get-presigned-url.req.dto';
import { PresignedUrlResponseDto } from '../dtos/res/presigned-url.res.dto';
import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { file } from '@server/generated';

@file.FileServiceControllerMethods()
@Controller()
export class FileController implements file.FileServiceController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	@SerializeOptions({ type: PresignedUrlResponseDto, strategy: 'exposeAll' })
	async getPresignedUrl(@Body() body: GetPresignedUrlDto): Promise<PresignedUrlResponseDto> {
		return await this.fileService.getPresignedUrl(body);
	}
}
