import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateEmoijDto } from './create-emoij.dto';

export class UpdateEmoijDto extends PartialType(CreateEmoijDto) {
    @IsNotEmpty()
    _id: string;
}
