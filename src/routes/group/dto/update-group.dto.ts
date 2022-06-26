import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsNotEmpty()
  _id: string;

  @ValidateNested({ each: true })
  @Type(() => String)
  memberIds?: string[];
}
