import { Test, TestingModule } from '@nestjs/testing';
import { EmoijService } from './emoij.service';

describe('EmoijService', () => {
  let service: EmoijService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmoijService],
    }).compile();

    service = module.get<EmoijService>(EmoijService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
