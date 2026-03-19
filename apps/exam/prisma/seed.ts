import { PrismaClient } from '@prisma-client/exam';

const prisma = new PrismaClient();

const tagsList = [
	// ROOT 1
	{ name: 'Exam Structure', lft: 1, rgt: 38 },

	{ name: 'TOEIC', lft: 2, rgt: 21 },

	{ name: 'TOEIC Listening', lft: 3, rgt: 12 },
	{ name: 'TOEIC Listening Part 1', lft: 4, rgt: 5 },
	{ name: 'TOEIC Listening Part 2', lft: 6, rgt: 7 },
	{ name: 'TOEIC Listening Part 3', lft: 8, rgt: 9 },
	{ name: 'TOEIC Listening Part 4', lft: 10, rgt: 11 },

	{ name: 'TOEIC Reading', lft: 13, rgt: 20 },
	{ name: 'TOEIC Reading Part 5', lft: 14, rgt: 15 },
	{ name: 'TOEIC Reading Part 6', lft: 16, rgt: 17 },
	{ name: 'TOEIC Reading Part 7', lft: 18, rgt: 19 },

	{ name: 'IELTS', lft: 22, rgt: 37 },
	{ name: 'IELTS Listening P1-4', lft: 23, rgt: 24 },
	{ name: 'IELTS Reading P1-3', lft: 25, rgt: 26 },
	{ name: 'IELTS Writing T1-T2', lft: 27, rgt: 28 },
	{ name: 'IELTS Speaking P1-3', lft: 29, rgt: 30 },

	// ROOT 2
	{ name: 'Question Types and Formats', lft: 39, rgt: 96 },

	{ name: 'Comprehension', lft: 40, rgt: 61 },
	{ name: 'Detail Information', lft: 41, rgt: 42 },
	{ name: 'Exception NOT true', lft: 43, rgt: 44 },
	{ name: 'Graphic Based', lft: 45, rgt: 46 },
	{ name: 'Topic Purpose', lft: 47, rgt: 48 },
	{ name: 'Matching Headings', lft: 49, rgt: 50 },
	{ name: 'Inference', lft: 51, rgt: 52 },
	{ name: 'Implication', lft: 53, rgt: 54 },
	{ name: 'True False NG', lft: 55, rgt: 56 },
	{ name: 'Text Completion', lft: 57, rgt: 58 },
	{ name: 'Synonym In Context', lft: 59, rgt: 60 },

	{ name: 'Short Q and A', lft: 62, rgt: 73 },
	{ name: 'WH Questions', lft: 63, rgt: 64 },
	{ name: 'Yes No Questions', lft: 65, rgt: 66 },
	{ name: 'Tag Questions (Grammar)', lft: 67, rgt: 68 }, // disambiguated
	{ name: 'Choice Questions', lft: 69, rgt: 70 },
	{ name: 'Request Suggestion', lft: 71, rgt: 72 },

	{ name: 'Text and Audio Formats', lft: 74, rgt: 95 },
	{ name: 'Email Letter Memo', lft: 75, rgt: 76 },
	{ name: 'Announcement Notice', lft: 77, rgt: 78 },
	{ name: 'Form Schedule List', lft: 79, rgt: 80 },
	{ name: 'Text Message Chain', lft: 81, rgt: 82 },
	{ name: 'Advertisement Article', lft: 83, rgt: 84 },
	{ name: 'Talk Broadcast Meeting', lft: 85, rgt: 86 },
	{ name: 'Photo Human Object', lft: 87, rgt: 88 },
	{ name: 'Chart Map Process', lft: 89, rgt: 90 },

	// ROOT 3
	{ name: 'Knowledge Points', lft: 97, rgt: 140 },

	{ name: 'Grammar', lft: 98, rgt: 121 },
	{ name: 'Nouns Pronouns', lft: 99, rgt: 100 },
	{ name: 'Adjectives Adverbs', lft: 101, rgt: 102 },
	{ name: 'Prepositions Conjunctions', lft: 103, rgt: 104 },
	{ name: 'Tenses', lft: 105, rgt: 106 },
	{ name: 'Voice Active Passive', lft: 107, rgt: 108 },
	{ name: 'Infinitives Gerunds', lft: 109, rgt: 110 },
	{ name: 'Participles', lft: 111, rgt: 112 },
	{ name: 'Comparisons', lft: 113, rgt: 114 },
	{ name: 'Relative Clauses', lft: 115, rgt: 116 },
	{ name: 'Conditionals', lft: 117, rgt: 118 },

	{ name: 'Vocabulary', lft: 122, rgt: 139 },
	{ name: 'Business Office', lft: 123, rgt: 124 },
	{ name: 'Personnel HR', lft: 125, rgt: 126 },
	{ name: 'Marketing Project', lft: 127, rgt: 128 },
	{ name: 'Shopping Delivery', lft: 129, rgt: 130 },
	{ name: 'Transportation Housing', lft: 131, rgt: 132 },
	{ name: 'Academic Education', lft: 133, rgt: 134 },
	{ name: 'Science Technology', lft: 135, rgt: 136 },
	{ name: 'Health Environment', lft: 137, rgt: 138 },
];

async function seedTags() {
	await prisma.tag.createMany({
		data: tagsList,
		skipDuplicates: true,
	});
}

async function main() {
	await seedTags();
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
