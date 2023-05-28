import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Appointment } from './appointment.scheme';
@Schema()
export class TimeRange extends Document {
  @Prop({ required: true })
  from: string;
  @Prop({ required: true })
  to: string;
  @Prop({ required: true, default: [] })
  appoitments: Appointment[];
}

export const TimeRangeSchema = SchemaFactory.createForClass(TimeRange);
