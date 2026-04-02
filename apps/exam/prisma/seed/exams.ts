import { ExamStatus } from '../../src/enums/exam-status.enum';
import { IeltsLExamSeeder } from './exam-ielts-l';
import { ToeicLrExamSeeder } from './exam-toeic-lr';
import { Prisma, PrismaClient } from '@prisma-client/exam';

// i'm seeding it

// order in this seeder is assigned value incrementing from 1, however in production, order is assigned by the server algo and is not as simple as in the seeder
// just keep that in mind

export async function seedExams(prisma: PrismaClient) {
	const tags = await prisma.tag.findMany();
	const tagsMap = new Map(tags.map(tag => [tag.name.toLocaleLowerCase(), tag.id]));

	const tagNamesToIdInputs = (names: string[]): { tagId: string }[] => {
		return names
			.map(n => {
				n = n.toLocaleLowerCase();
				if (!tagsMap.has(n)) console.warn(`Database does not have tag ${n}`);
				return { tagId: tagsMap.get(n) };
			})
			.filter((inp): inp is { tagId: string } => !!inp.tagId);
	};

	// 1
	const toeicDefaultLRExam: Prisma.ExamCreateInput = new ToeicLrExamSeeder(
		tagNamesToIdInputs,
	).seed();

	// 2
	const ieltsDefaultLExam: Prisma.ExamCreateInput = new IeltsLExamSeeder(tagNamesToIdInputs).seed();

	// 3
	const ieltsDefaultRExam: Prisma.ExamCreateInput = {
		createdBy: 'admmin-id',
		title: 'IELTS R 1',
		duration: 60 * 60,
		status: ExamStatus.Approved,
		examTags: {
			createMany: {
				data: tagNamesToIdInputs(['IELTS Listening P1-4', 'IELTS Reading P1-3']),
				skipDuplicates: true,
			},
		},
		sections: { createMany: { data: [], skipDuplicates: true } },
	};

	// 4
	const toeicDefaultWritingExam: Prisma.ExamCreateInput = {
		createdBy: 'admin-id',
		title: 'TOEIC Writing 1',
		duration: 60 * 60,
		status: ExamStatus.Approved,
		examTags: {
			createMany: { data: tagNamesToIdInputs(['TOEIC', 'Writing']), skipDuplicates: true },
		},
		sections: { createMany: { data: [], skipDuplicates: true } },
	};

	// 5
	const IELTS_DEFAULT_W_ID = 'ielts-writing-default';
	const ieltsDefaultWritingExam: Prisma.ExamCreateInput = {
		createdBy: 'admin-id',
		id: IELTS_DEFAULT_W_ID,
		title: 'IELTS Writing 1',
		duration: 60 * 60,
		status: ExamStatus.Approved,
		examTags: {
			createMany: { data: tagNamesToIdInputs(['IELTS', 'Writing']), skipDuplicates: true },
		},
		sections: { createMany: { data: [], skipDuplicates: true } },
	};

	await prisma.exam.createMany({
		data: [
			toeicDefaultLRExam,
			ieltsDefaultLExam,
			ieltsDefaultRExam,
			toeicDefaultWritingExam,
			ieltsDefaultWritingExam,
		],
		skipDuplicates: true,
	});
}
