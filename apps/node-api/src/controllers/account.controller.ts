import {
  ApiController,
  ApplyNoneCache,
  SwaggerResponse,
} from '../libs/decorators';
import { AccontService } from '../modules';
import { CreateAccountDto, ResponseAccountDto } from '../core';
import { Body, Get, Param, Post } from '@nestjs/common';

@ApiController('account')
export class AccountController {
  constructor(private readonly accountService: AccontService) {}

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
}
