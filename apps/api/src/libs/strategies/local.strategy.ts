import { from, map } from 'rxjs';
import { Strategy } from 'passport-local';
import { AuthService } from '../../frameworks';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    return from(this.authService.validateUser(username, password)).pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      })
    );
  }
}
