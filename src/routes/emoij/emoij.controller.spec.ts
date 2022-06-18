import { Test, TestingModule } from '@nestjs/testing';
import { EmoijController } from './emoij.controller';
import { EmoijService } from './emoij.service';

describe('EmoijController', () => {
  let controller: EmoijController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmoijController],
      providers: [EmoijService],
    }).compile();

    controller = module.get<EmoijController>(EmoijController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
