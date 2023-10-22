import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from '../db/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationService],
  exports: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
