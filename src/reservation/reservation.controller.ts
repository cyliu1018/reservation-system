import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { InsertReservationRecordWithInviteCodeDto } from './reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservationRecord(@Query('email') email: string) {
    return await this.reservationService.getReservationRecord(email);
  }

  @Post()
  async insertReservationRecordWithInviteCode(
    @Body() { email, inviteCode }: InsertReservationRecordWithInviteCodeDto,
  ) {
    return await this.reservationService.insertReservationRecordWithInviteCode(
      email,
      inviteCode,
    );
  }
}
