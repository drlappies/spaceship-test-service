import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PriceDocument = mongoose.HydratedDocument<Price>;

@Schema({ timestamps: true })
export class Price {
  @Prop({ type: mongoose.Schema.Types.String })
  coin: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  data: Record<string, number>;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
