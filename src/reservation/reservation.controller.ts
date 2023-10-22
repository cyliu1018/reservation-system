import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { InsertReservationRecordWithInviteCodeDto } from './reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('hello')
  async hello(@Query('name') name: string) {
    return this.reservationService.hello(name);
  }

  @Get()
  async getReservationRecord(@Query('email') email: string) {
    return await this.reservationService.getReservationRecord(email);
  }

  @Get('code')
  async checkCodeValidity(@Query('code') code: string) {
    return await this.reservationService.checkCodeValidity(code);
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
