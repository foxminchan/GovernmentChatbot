import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../../core';
import { DataService } from '../../frameworks';
import { CryptoUtils } from '../../libs/utils';

@Injectable()
export class AccountService {
  constructor(private readonly dataService: DataService) {}

  findUser(username: string) {
    return this.dataService.account.findUnique({
      where: { username },
      include: { user: true },
    });
  }

  async createAccount(account: CreateAccountDto) {
    const hashPassword = await CryptoUtils.hashString(account.password);
    return this.dataService.$transaction([
      this.dataService.account.create({
        data: {
          ...account,
          password: hashPassword,
        },
      }),
    ]);
  }
}
