import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from '../usecase';
import { CreateAccountDto } from '../core';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../frameworks';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService
  ) {}

  @Post('register')
  register(@Body() user: CreateAccountDto) {
    return this.accountService.addAccount(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: any) {
    return this.authService.login(req.user);
  }
}
