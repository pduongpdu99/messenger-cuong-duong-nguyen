import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    messageText: string;

    urls: string[];

    @IsNotEmpty()
    sentUserId: string;

    hasEdited: boolean = false;
    isDeleted: boolean = false;
}
