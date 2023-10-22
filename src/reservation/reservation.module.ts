import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from '../db';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), ConfigModule],
  providers: [ReservationService, ConfigService],
  exports: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
