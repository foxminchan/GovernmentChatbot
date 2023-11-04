import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { omit } from 'helper-fns';
import { JwtService } from '@nestjs/jwt';
import { AccontService } from '../../modules';
import { CryptoUtils } from '../../libs/utils';
import { LoginPayload } from '../../libs/helpers';
import { from, of, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccontService,
    private jwtService: JwtService
  ) {}

  validateUser(user: LoginPayload) {
    return from(this.accountService.findUser(user.username)).pipe(
      switchMap((res) => {
        if (!res)
          return throwError(
            () => new ForbiddenException('You account has not been created yet')
          );

        return from(CryptoUtils.verifyHash(res.password, user.password)).pipe(
          switchMap((isValid) => {
            return isValid
              ? of(omit(res, ['password']))
              : throwError(
                  () =>
                    new UnauthorizedException('Invalid password or username')
                );
          })
        );
      })
    );
  }

  async login(user: LoginPayload) {
    return this.validateUser(user).pipe(
      switchMap((res) => {
        if (!res) throw new UnauthorizedException();
        return of({
          access_token: this.jwtService.sign({
            email: res.username,
            id: res.id,
            role: res.role,
            claims: res.claim,
          }),
        });
      })
    );
  }
}
