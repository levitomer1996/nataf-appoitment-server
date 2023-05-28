import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimeModel } from './TimeModel';
import { User } from 'src/auth/Schemes/User.Scheme';
@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  time: TimeModel;
  @Prop({ required: true, default: null })
  user_id: string;
  @Prop({ required: true, default: false })
  isTaken: boolean;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
