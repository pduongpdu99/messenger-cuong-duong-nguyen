import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.String })
  password: string;

  @Prop({ type: mongoose.Schema.Types.String })
  firstName: string;

  @Prop({ type: mongoose.Schema.Types.String })
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.String })
  avatar: string;

  @Prop({ type: mongoose.Schema.Types.String })
  access_token: string;

  @Prop({ type: mongoose.Schema.Types.String })
  emailAddress: string;

  @Prop({ type: mongoose.Schema.Types.String })
  birthday: string;

  @Prop({ type: mongoose.Schema.Types.String })
  nickname: string;

  @Prop({ type: mongoose.Schema.Types.String })
  phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.Boolean })
  isDelete: boolean = false;

  @Prop({ type: mongoose.Schema.Types.Boolean })
  isActive: boolean = false;
}

export const UserSchema = SchemaFactory.createForClass(User);
