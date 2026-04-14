import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface ErrorMessage {
	[key: string]: string;
}

export class ResponseEntity<T> {
	@ApiProperty({
		description: 'API path',
		example: '/auth/login',
	})
	/** API path */
	path: string;

	@ApiProperty({
		description: 'HTTP status code',
		example: 200,
	})
	/** HTTP status code */
	statusCode: number;

	@ApiProperty({
		description: 'Request success status',
		example: true,
	})
	success: boolean;

	@ApiProperty({
		description: 'Response timestamp',
		example: Date.now(),
	})
	timestamp: Date | string | number;

	@ApiPropertyOptional({
		description: 'Error message if any',
		example: 'Unauthorized',
	})
	/** Error message if there's one */
	error?: string | ErrorMessage;

	@ApiProperty({
		description: 'Response payload, null if error and in special cases',
		nullable: true,
	})
	/** Set as null if there's error */
	data: T | null;

	constructor(res: ResponseEntity<T>) {
		this.path = res.path;
		this.statusCode = res.statusCode;
		this.success = res.success;
		this.timestamp = res.timestamp || Date.now();
		this.data = res.data;
		this.error = res.error;
	}
}
