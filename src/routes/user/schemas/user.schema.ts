
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: mongoose.Schema.Types.String })
    username: string;

    @Prop({ type: mongoose.Schema.Types.String })
    password: string;

    @Prop({ type: mongoose.Schema.Types.String })
    repeatPassword: string;

    @Prop({ type: mongoose.Schema.Types.String })
    access_token: string;

    @Prop({ type: mongoose.Schema.Types.String })
    email: string;

    @Prop({ type: mongoose.Schema.Types.String })
    birthday: string;

    @Prop({ type: mongoose.Schema.Types.String })
    phoneNumber: string;

    @Prop({ type: mongoose.Schema.Types.Boolean })
    isDelete: boolean = false;

    @Prop({ type: mongoose.Schema.Types.Boolean })
    isActive: boolean = false;
}

export const UserSchema = SchemaFactory.createForClass(User);