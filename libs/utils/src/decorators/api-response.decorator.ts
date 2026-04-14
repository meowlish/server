import { ResponseEntity } from '../data';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseEntity = <TModel extends Type<any>>(model: TModel) => {
	return applyDecorators(
		ApiExtraModels(ResponseEntity, model),
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(ResponseEntity) },
					{
						properties: {
							data: {
								$ref: getSchemaPath(model),
								nullable: true,
							},
						},
					},
				],
			},
		}),
	);
};
