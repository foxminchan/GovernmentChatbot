import {
  ApiController,
  ApplyNoneCache,
  Auth,
  SwaggerResponse,
} from '../libs/decorators';
import { AccountService } from '../modules';
import { AuthService } from '../frameworks';
import { LoginPayload } from '../libs/helpers';
import { Account, CreateAccountDto } from '../core';
import { Body, Get, Param, Post } from '@nestjs/common';

@ApiController('auth')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService
  ) {}

  @Auth()
  @ApplyNoneCache()
  @Get(':username')
  @SwaggerResponse({
    operation: 'Account fetch by username',
    params: ['username'],
    response: Account,
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
