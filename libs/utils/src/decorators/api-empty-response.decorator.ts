import { ResponseEntity } from '../data';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiEmptyResponseEntity = () => {
	return applyDecorators(
		ApiExtraModels(ResponseEntity),
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(ResponseEntity as Type<ResponseEntity<null>>) },
					{
						properties: {
							data: {
								type: 'null',
								nullable: true,
							},
						},
					},
				],
			},
		}),
	);
};
