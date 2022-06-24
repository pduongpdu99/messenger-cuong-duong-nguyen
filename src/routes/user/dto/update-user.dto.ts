import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    avatar: string;

    @IsString()
    @IsOptional()
    nickname: string;

    @IsString()
    @IsOptional()
    birthday: string;

    @IsPhoneNumber()
    @IsString()
    @IsOptional()
    phoneNumber: string;
}
