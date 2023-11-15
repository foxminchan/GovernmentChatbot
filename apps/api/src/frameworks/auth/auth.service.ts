import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Account } from '../../core';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../../modules';
import { CryptoUtils } from '../../libs/utils';
import { LoginPayload } from '../../libs/helpers';
import { Observable, from, of, switchMap, throwError } from 'rxjs';
import { AccessToken, JwtPayload } from '../../libs/helpers/jwt.helper';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService
  ) {}

  validateUser(user: LoginPayload): Observable<Account> {
    return from(this.accountService.findUser(user.username)).pipe(
      switchMap((res) => {
        if (!res)
          return throwError(
            () => new ForbiddenException('Tài khoản của bạn không tồn tại')
          );

        return from(CryptoUtils.verifyHash(res.password, user.password)).pipe(
          switchMap((isValid) => {
            return isValid
              ? of(res)
              : throwError(
                  () =>
                    new UnauthorizedException(
                      'Tên đăng nhập hoặc mật khẩu không hợp lệ'
                    )
                );
          })
        );
      })
    );
  }

  login(user: LoginPayload): Observable<AccessToken> {
    return this.validateUser(user).pipe(
      switchMap((res) => {
        if (!res) throw new UnauthorizedException();

        const token: JwtPayload = {
          sub: res.user_id,
          name: res.user.name,
          email: res.username,
          policy: {
            role: res.role,
            claims: res.claim,
          },
        };

        return of({
          access_token: this.jwtService.sign(token),
        });
      })
    );
  }
}
