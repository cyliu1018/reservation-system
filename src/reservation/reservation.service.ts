import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { Reservation } from '../db';
import { isCodeValid, generateCode } from '../util/inviteCode';

@Injectable()
export class ReservationService {
  private LIMIT_COUNT_FOR_USER_RESERVE_BY_MOCA_NFT: string;
  private LIMIT_COUNT_FOR_USER_RESERVE_BY_INVITE_CODE: string;

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private configService: ConfigService,
  ) {
    this.reservationRepository.upsert(
      {
        email: 'nlsh710599@gmail.com',
        inviteCode: 'CHIHYEN',
        reserveByMocaNFT: true,
      },
      ['email'],
    );
    try {
      this.LIMIT_COUNT_FOR_USER_RESERVE_BY_INVITE_CODE =
        this.configService.getOrThrow<string>(
          'LIMIT_COUNT_FOR_USER_RESERVE_BY_INVITE_CODE',
        );

      this.LIMIT_COUNT_FOR_USER_RESERVE_BY_MOCA_NFT =
        this.configService.getOrThrow<string>(
          'LIMIT_COUNT_FOR_USER_RESERVE_BY_MOCA_NFT',
        );
    } catch (error) {
      console.log(error);
    }
  }

  async getReservationRecord(email: string) {
    try {
      const res = await this.reservationRepository.findOneBy({ email });

      if (!res) {
        return new BadRequestException('User not found');
      }

      return res;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async insertReservationRecordWithInviteCode(
    email: string,
    inviteCode: string,
  ) {
    try {
      if (!isCodeValid(inviteCode)) {
        return new BadRequestException('invalid invite code');
      }

      let res = await this.reservationRepository.findOneBy({ email });

      if (res) {
        return new BadRequestException('User already exist');
      }

      try {
        res = (
          await this.reservationRepository.query(
            `INSERT INTO reservation (email, referrer, invite_code, reserve_by_moca_nft) SELECT $1, $2, $3, $4 FROM reservation HAVING ((SELECT COUNT(*) FROM reservation WHERE referrer = $5) < $6 AND (SELECT reserve_by_moca_nft FROM reservation WHERE invite_code = $7) = true OR (SELECT COUNT(*) FROM reservation WHERE referrer = $8) < $9 AND (SELECT reserve_by_moca_nft FROM reservation WHERE invite_code = $10) = false) AND (SELECT COUNT(*) FROM reservation WHERE invite_code = $11) = 1 RETURNING *;`,
            [
              email,
              inviteCode,
              generateCode(),
              false,
              inviteCode,
              this.LIMIT_COUNT_FOR_USER_RESERVE_BY_MOCA_NFT,
              inviteCode,
              inviteCode,
              this.LIMIT_COUNT_FOR_USER_RESERVE_BY_INVITE_CODE,
              inviteCode,
              inviteCode,
            ],
          )
        )[0];
      } catch (error) {
        return new InternalServerErrorException();
      }
      return res
        ? res
        : new BadRequestException('Invite code usage limit reached');
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
