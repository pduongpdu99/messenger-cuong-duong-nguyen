import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  messageText: string;

  @IsOptional()
  urls: string[];

  hasEdited: boolean = true;

  @IsOptional()
  hasReaded: boolean;

  @IsOptional()
  isDeleted: boolean;
}
