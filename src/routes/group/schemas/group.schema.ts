import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  @Prop({ type: mongoose.Schema.Types.String })
  name?: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: User.name })
  memberIds?: string[];

  @Prop({ type: mongoose.Schema.Types.Boolean })
  isDelete?: boolean;

  @Prop({ type: mongoose.Schema.Types.Boolean })
  isActive?: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
