import {
  Auth,
  ApiController,
  ApplyNoneCache,
  SwaggerResponse,
} from '../libs/decorators';
import { AccountService } from '../modules';
import { AuthService } from '../frameworks';
import { Body, Get, Param, Post } from '@nestjs/common';
import { AccessToken } from '../libs/helpers/jwt.helper';
import { Account, CreateAccountDto, User } from '../core';
import { AccountPayload, LoginPayload } from '../libs/helpers';

@ApiController('auth')
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService
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
    body: AccountPayload,
    response: User,
  })
  createAccountWithUser(@Body() account: AccountPayload) {
    return this.accountService.createAccountWithUser(
      account.user,
      account.password
    );
  }

  @Post('exists')
  @SwaggerResponse({
    operation: 'Create account with existing user',
    body: CreateAccountDto,
    response: Account,
  })
  createAccount(@Body() account: CreateAccountDto) {
    return this.accountService.createAccount(account);
  }

  @Post('login')
  @SwaggerResponse({
    operation: 'Login account',
    body: LoginPayload,
    response: AccessToken,
  })
  login(@Body() user: LoginPayload) {
    return this.authService.login(user);
  }
}
