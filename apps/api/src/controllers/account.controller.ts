import {
  ApiController,
  ApplyNoneCache,
  SwaggerResponse,
} from '../libs/decorators';
import { AccontService } from '../modules';
import { AuthService } from '../frameworks';
import { JwtAuthGuard } from '../libs/guards';
import { LoginPayload } from '../libs/helpers';
import { CreateAccountDto, ResponseAccountDto } from '../core';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';

@ApiController('auth')
export class AccountController {
  constructor(
    private readonly accountService: AccontService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApplyNoneCache()
  @Get(':username')
  @SwaggerResponse({
    operation: 'Account fetch by username',
    params: ['username'],
    response: ResponseAccountDto,
  })
  getAccounts(@Param('username') username: string) {
    return this.accountService.findUser(username);
  }

  @Post()
  @SwaggerResponse({
    operation: 'Create account',
    body: CreateAccountDto,
  })
  createAccount(@Body() account: CreateAccountDto) {
    return this.accountService.createAccount(account);
  }

  @Post('login')
  @SwaggerResponse({
    operation: 'Login account',
    body: LoginPayload,
  })
  login(@Body() user: LoginPayload) {
    return this.authService.login(user);
  }
}
