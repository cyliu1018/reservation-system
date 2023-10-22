import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../db/entity';
import { isCodeValid } from '../util/inviteCode';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {
    this.profileRepository.upsert(
      {
        email: 'nlsh710599@gmail.com',
        inviteCode: 'CHIHYEN',
        reserveByMocaNFT: true,
      },
      ['email'],
    );
  }

  hello(name: string): string {
    return `Hello ${name}`;
  }

  async getProfile(email: string) {
    try {
      const res = await this.profileRepository.findOneBy({ email });

      if (!res) {
        return new BadRequestException('User not found');
      }

      return res;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async checkCodeValidity(inviteCode: string) {
    try {
      return isCodeValid(inviteCode);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async insertProfileWithInviteCode(email: string, inviteCode: string) {
    try {
      if (!isCodeValid(inviteCode)) {
        return new BadRequestException('invalid invite code');
      }

      const res = await this.profileRepository.findOneBy({ email });

      if (res) {
        return new BadRequestException('User already exist');
      }

      return;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
