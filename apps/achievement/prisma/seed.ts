import { BADGE_INFORMATION } from '../src/constants/badge-info.const';
import { Badge } from '../src/enums/badge.enum';
import { PrismaClient } from '@prisma-client/achievement';

const prisma = new PrismaClient();

async function seedBadges() {
	await prisma.badge.createMany({
		data: Object.values(Badge).map(b => ({
			name: b,
			...BADGE_INFORMATION[b],
		})),
		skipDuplicates: true,
	});
}

async function main() {
	await seedBadges();
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
