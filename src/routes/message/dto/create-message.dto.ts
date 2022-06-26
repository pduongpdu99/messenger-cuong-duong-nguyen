import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  messageText: string;

  urls: string[];

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  sentUserId: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  groupId: string;

  hasEdited: boolean = false;
  isDeleted: boolean = false;
}
