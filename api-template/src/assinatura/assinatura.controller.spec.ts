import { Test, TestingModule } from '@nestjs/testing';
import { AssinaturaController } from './assinatura.controller';
import { AssinaturaService } from './assinatura.service';

describe('AssinaturaController', () => {
  let controller: AssinaturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssinaturaController],
      providers: [AssinaturaService],
    }).compile();

    controller = module.get<AssinaturaController>(AssinaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
