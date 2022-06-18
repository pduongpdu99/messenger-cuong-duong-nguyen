import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    repeatPassword: string;

    @IsString()
    access_token: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    birthday: string;

    @IsPhoneNumber()
    @IsString()
    phoneNumber: string;

    isDelete: boolean = false;

    isActive: boolean = false;
}
