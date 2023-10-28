import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../../core';
import { DataService } from '../../frameworks';

@Injectable()
export class AccontService {
  constructor(private readonly dataService: DataService) {}

  getAllAccounts() {
    return this.dataService.account.findMany();
  }

  getById(id: string) {
    return this.dataService.account.findUnique({
      where: { id },
    });
  }

  findUser(username: string) {
    return this.dataService.account.findUnique({
      where: { username },
    });
  }

  async createAccount(account: CreateAccountDto) {
    const hash = await argon2.hash(account.password);
    return this.dataService.$transaction([
      this.dataService.account.create({
        data: {
          ...account,
          password: hash,
        },
      }),
    ]);
  }

  async updateAccount(id: string, account: CreateAccountDto) {
    const hash = await argon2.hash(account.password);
    return this.dataService.$transaction([
      this.dataService.account.update({
        where: { id },
        data: {
          ...account,
          password: hash,
        },
      }),
    ]);
  }

  deleteAccount(id: string) {
    return this.dataService.$transaction([
      this.dataService.account.delete({
        where: { id },
      }),
    ]);
  }
}
