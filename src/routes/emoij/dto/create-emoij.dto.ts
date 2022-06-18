import { IsNotEmpty, IsString, IsNumber, Length } from "class-validator";

export class CreateEmoijDto {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsNumber()
    width?: number;

    @IsNumber()
    height?: number;

    @IsString()
    @IsNotEmpty()
    refemoji?: string;

    @IsString()
    @IsNotEmpty()
    describe?: string;

    isDeleted?: boolean = false;

    isBlocked?: boolean = false;
}
