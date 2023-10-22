import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { InsertProfileWithInviteCodeDto } from './profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('hello')
  async hello(@Query('name') name: string) {
    return this.profileService.hello(name);
  }

  @Get()
  async getProfile(@Query('email') email: string) {
    return await this.profileService.getProfile(email);
  }

  @Get('code')
  async checkCodeValidity(@Query('code') code: string) {
    return await this.profileService.checkCodeValidity(code);
  }

  @Post()
  async insertProfileWithInviteCode(
    @Body() { email, inviteCode }: InsertProfileWithInviteCodeDto,
  ) {
    return await this.profileService.insertProfileWithInviteCode(
      email,
      inviteCode,
    );
  }
}
