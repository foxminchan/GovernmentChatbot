import { AccontService } from '../modules';
import { CreateAccountDto } from '../core';
import { GenericController } from '../libs/decorators';
import { Body, Get, Param, Post } from '@nestjs/common';

@GenericController('account')
export class AccountController {
  constructor(private readonly accountService: AccontService) {}

  @Get(':username')
  getAccounts(@Param('username') username: string) {
    return this.accountService.findUser(username);
  }

  @Post()
  createAccount(@Body() account: CreateAccountDto) {
    return this.accountService.createAccount(account);
  }
}
