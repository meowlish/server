import { PrismaClient } from '@prisma-client/file';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';

const prisma = new PrismaClient();

function getAllFiles(dir: string): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let files: string[] = [];
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files = files.concat(getAllFiles(fullPath));
		} else if (entry.isFile()) {
			files.push(fullPath);
		}
	}
	return files;
}

async function main() {
	const rootMediaDir = path.join(process.cwd(), 'eng-media');
	if (!fs.existsSync(rootMediaDir)) {
		throw new Error(
			`Directory not found: ${rootMediaDir}. Please put the files needed to sit in the folder eng-media at project root, or you can skip seeding the file service.`,
		);
	}
	const files = getAllFiles(rootMediaDir);
	const data = files.map(filePath => {
		const stats = fs.statSync(filePath);
		const mimeType = mime.lookup(filePath) || 'application/octet-stream';
		const name = path.parse(filePath).base;
		return {
			id: name,
			name: name,
			size: stats.size,
			mimeType: mimeType,
			refCount: 1,
			isPublic: true,
		};
	});
	// Insert in batches (important for large folders)
	const batchSize = 500;
	for (let i = 0; i < data.length; i += batchSize) {
		const batch = data.slice(i, i + batchSize);
		await prisma.file.createMany({
			data: batch,
			skipDuplicates: true,
		});
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
