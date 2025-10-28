import { Test, TestingModule } from '@nestjs/testing';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

describe('GatewayController', () => {
	let gatewayController: GatewayController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GatewayController],
			providers: [GatewayService],
		}).compile();

		gatewayController = module.get<GatewayController>(GatewayController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(gatewayController.getHello()).toBe('Hello World!');
		});
	});
});
