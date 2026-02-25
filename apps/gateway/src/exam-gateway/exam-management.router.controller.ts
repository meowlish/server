import { HasPermissions } from '../auth/decorators/permissions.decorator';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { type AuthenticatedRequest } from '../types/authenticated-request';
import { EXAM_CLIENT } from './constants/exam';
import { CreateExamDto } from './dtos/req/management/create-exam.req.dto';
import { CreateQuestionDto } from './dtos/req/management/create-question.req.dto';
import { CreateSectionDto } from './dtos/req/management/create-section.req.dto';
import { MoveQuestionDto } from './dtos/req/management/move-question.req.dto';
import { MoveSectionDto } from './dtos/req/management/move-section.req.dto';
import { ReviewExamDto } from './dtos/req/management/review-exam.req.dto';
import { UpdateExamDto } from './dtos/req/management/update-exam.req.dto';
import { UpdateQuestionDto } from './dtos/req/management/update-question.req.dto';
import { UpdateSectionDto } from './dtos/req/management/update-section.req.dto';
import {
	Body,
	Controller,
	Delete,
	Inject,
	OnModuleInit,
	Param,
	Patch,
	Post,
	Req,
} from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { exam } from '@server/generated';
import { Permission, Role } from '@server/utils';

@HasRoles(Role.MODERATOR, Role.ADMIN)
@Controller('management')
export class ExamManagementGatewayController implements OnModuleInit {
	private examManagementService!: exam.ExamManagementServiceClient;

	constructor(@Inject(EXAM_CLIENT) private readonly examClient: ClientGrpc) {}

	onModuleInit() {
		this.examManagementService = this.examClient.getService<exam.ExamManagementServiceClient>(
			exam.EXAM_MANAGEMENT_SERVICE_NAME,
		);
	}

	@Post()
	createExam(@Req() req: AuthenticatedRequest, @Body() body: CreateExamDto) {
		const res = this.examManagementService.createExam({ ...body, createdBy: req.user.sub });
		return res;
	}

	@Post(':id/sections')
	createSectionInExam(@Param('id') id: string, @Body() body: CreateSectionDto) {
		const res = this.examManagementService.createSection({ ...body, examId: id });
		return res;
	}

	@Post('sections/:id/sections')
	createSectionInSection(@Param('id') id: string, @Body() body: CreateSectionDto) {
		const res = this.examManagementService.createSection({ ...body, sectionId: id });
		return res;
	}

	@Post('sections/:id/questions')
	createQuestion(@Param('id') id: string, @Body() body: CreateQuestionDto) {
		const res = this.examManagementService.createQuestion({ ...body, sectionId: id });
		return res;
	}

	@Patch(':id')
	updateExam(@Param('id') id: string, @Body() body: UpdateExamDto) {
		const res = this.examManagementService.updateExam({ ...body, id });
		return res;
	}

	@Patch('sections/:id')
	updateSection(@Param('id') id: string, @Body() body: UpdateSectionDto) {
		const res = this.examManagementService.updateSection({ ...body, id });
		return res;
	}

	@Patch('questions/:id')
	updateQuestion(@Param('id') id: string, @Body() body: UpdateQuestionDto) {
		const res = this.examManagementService.updateQuestion({ ...body, id });
		return res;
	}

	@Delete(':id')
	deleteExam(@Param('id') id: string) {
		const res = this.examManagementService.deleteExam({ id });
		return res;
	}

	@Delete('sections/:id')
	deleteSection(@Param('id') id: string) {
		const res = this.examManagementService.deleteSection({ id });
		return res;
	}

	@Delete('questions/:id')
	deleteQuestion(@Param('id') id: string) {
		const res = this.examManagementService.deleteQuestion({ id });
		return res;
	}

	@Patch('sections/:id/move')
	moveSection(@Param('id') id: string, @Body() body: MoveSectionDto) {
		const res = this.examManagementService.moveSection({ ...body, id });
		return res;
	}

	@Patch('questions/:id/move')
	moveQuestion(@Param('id') id: string, @Body() body: MoveQuestionDto) {
		const res = this.examManagementService.moveQuestion({ ...body, id });
		return res;
	}

	@Patch(':id/review')
	@HasPermissions(Permission.EXAM_APPROVE)
	reviewExam(@Param('id') id: string, @Body() body: ReviewExamDto) {
		const res = this.examManagementService.reviewExam({ ...body, id });
		return res;
	}
}
