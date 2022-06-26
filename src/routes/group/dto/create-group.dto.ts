import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  memberIds?: string[];

  name?: string;

  isDelete?: boolean = false;
}
