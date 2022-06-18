
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type EmoijDocument = Emoij & Document;

@Schema({ timestamps: true })
export class Emoij {
    @Prop({ type: mongoose.Schema.Types.String })
    name?: string;

    @Prop({ type: mongoose.Schema.Types.Number })
    width?: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    height?: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    describe?: string;

    @Prop({ type: mongoose.Schema.Types.Number })
    refemoji?: string;

    @Prop({ type: mongoose.Schema.Types.Boolean })
    isDelete?: boolean = false;

    @Prop({ type: mongoose.Schema.Types.Boolean })
    isBlocked?: boolean = false;
}

export const EmoijSchema = SchemaFactory.createForClass(Emoij);