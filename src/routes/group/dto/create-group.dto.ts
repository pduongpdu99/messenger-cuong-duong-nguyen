import { IsString } from "class-validator";

export class CreateGroupDto {
    @IsString()
    name?: string;
    memberIds?: string[];
    messageIds?: string[];
    isDelete?: boolean;
    isActive?: boolean;
}
