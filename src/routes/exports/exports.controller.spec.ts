import { Test, TestingModule } from '@nestjs/testing';
import { ExportsController } from './exports.controller';
import { ExportsService } from './exports.service';

describe('ExportsController', () => {
  let controller: ExportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportsController],
      providers: [ExportsService],
    }).compile();

    controller = module.get<ExportsController>(ExportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
