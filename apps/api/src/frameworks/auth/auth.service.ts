import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { from, of, switchMap } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { AccontService } from '../../modules';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccontService,
    private jwtService: JwtService
  ) {}

  async login(user: { userId: string; username: string }) {
    const payload = { email: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateUser(username: string, password: string) {
    return from(this.accountService.findUser(username)).pipe(
      switchMap((user) => {
        return !user
          ? null
          : from(argon2.verify(user.password, password)).pipe(
              switchMap((match) => {
                return !match ? null : of({ password, ...user });
              })
            );
      })
    );
  }

  validateApiKey(apikey: string) {
    return apikey === process.env.API_KEY;
  }
}
