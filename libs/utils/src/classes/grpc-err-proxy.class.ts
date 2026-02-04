import { ClientGrpcProxy, GrpcOptions, RpcException } from '@nestjs/microservices';

export class ErrorHandlingGrpcProxy extends ClientGrpcProxy {
	constructor(options: Required<GrpcOptions>['options']) {
		super(options);
	}

	override serializeError(err: object) {
		return new RpcException(err);
	}
}
