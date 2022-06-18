
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
    // message bình thường
    @Prop({ type: mongoose.Schema.Types.String })
    messageText: string;

    // có thể là một danh sách videos
    // có thể là một danh sách images
    @Prop({ type: mongoose.Schema.Types.String })
    urls: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    sentUserId: string;

    @Prop({ type: mongoose.Schema.Types.Boolean })
    hasEdited: boolean = false;

    @Prop({ type: mongoose.Schema.Types.Boolean })
    isDeleted: boolean = false;
}

export const MessageSchema = SchemaFactory.createForClass(Message);