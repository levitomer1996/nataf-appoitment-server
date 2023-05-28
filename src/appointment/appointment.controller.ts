import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { TimeRange } from './scheme/timeRange.scheme';
import { TimeRangeDTO } from './DTO/CreateTimeRange.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post('/createrange')
  async createTimeRange(@Body() createDto: TimeRangeDTO): Promise<TimeRange> {
    return this.appointmentService.createAvailableTimeRage(createDto);
  }
}
