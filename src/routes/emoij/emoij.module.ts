import { Module } from '@nestjs/common';
import { EmoijService } from './emoij.service';
import { EmoijController } from './emoij.controller';
import { Emoij, EmoijSchema } from './schemas/emoij.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Emoij.name,
        schema: EmoijSchema
      }
    ])
  ],
  controllers: [EmoijController],
  providers: [EmoijService]
})
export class EmoijModule { }
