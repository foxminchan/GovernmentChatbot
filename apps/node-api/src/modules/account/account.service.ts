import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../../core';
import { DataService } from '../../frameworks';

@Injectable()
export class AccontService {
  constructor(private readonly dataService: DataService) {}

  async createAccount(account: CreateAccountDto) {
    const hash = await argon2.hash(account.password);
    return this.dataService.account.create({
      data: {
        ...account,
        password: hash,
      },
    });
  }

  findUser(username: string) {
    return this.dataService.account.findUnique({
      where: { username },
    });
  }
}