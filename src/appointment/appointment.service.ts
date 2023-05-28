import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './scheme/appointment.scheme';
import { Model } from 'mongoose';
import { TimeModel } from './scheme/TimeModel';
import { TimeRange } from './scheme/timeRange.scheme';
import { TimeRangeDTO } from './DTO/CreateTimeRange.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
    @InjectModel(TimeRange.name)
    private readonly limeRangeModel: Model<TimeRange>,
  ) {}

  async createAppointment(time: TimeModel): Promise<Appointment> {
    const newAppointment = new this.appointmentModel({ time });
    return await newAppointment.save();
  }
  createAvailableTimeRage(
    createDto: TimeRangeDTO,
  ): TimeRange | PromiseLike<TimeRange> {
    throw new Error('Method not implemented.');
  }
}
