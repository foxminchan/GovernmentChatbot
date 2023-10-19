import { Injectable } from '@nestjs/common';
import { DataService } from '../../frameworks';
import { CreateAccountDto } from '../../core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(private readonly dataService: DataService) {}

  getAccount(username: string) {
    return this.dataService.account.findUnique({
      where: { username: username },
    });
  }

  addAccount(user: CreateAccountDto) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        return this.dataService.account.create({
          data: {
            ...user,
            password: hash,
          },
        });
      });
    });
  }
}
