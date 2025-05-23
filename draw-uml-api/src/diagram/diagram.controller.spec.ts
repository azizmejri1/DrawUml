import { Test, TestingModule } from '@nestjs/testing';
import { DiagramController } from './diagram.controller';

describe('DiagramController', () => {
  let controller: DiagramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagramController],
    }).compile();

    controller = module.get<DiagramController>(DiagramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
