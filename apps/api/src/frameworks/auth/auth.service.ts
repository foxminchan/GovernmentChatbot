import { Injectable } from '@nestjs/common';
import { AccountService } from '../../usecase';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async validAccount(username: string, pass: string) {
    return await this.accountService.getAccount(username).then((account) => {
      if (account && account.password === pass) {
        return account;
      }
      return null;
    });
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
