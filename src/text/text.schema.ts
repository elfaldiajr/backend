import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Text extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ default: 0 })
  order: number;
}

export const TextSchema = SchemaFactory.createForClass(Text);