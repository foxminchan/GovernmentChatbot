import { AuthService } from '../../frameworks';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key'
) {
  constructor(private authService: AuthService) {
    super({ header: 'X-Api-Key', prefix: '' }, true, async (apikey, done) => {
      const isValid = this.authService.validateApiKey(apikey);
      return !isValid
        ? done(new UnauthorizedException(), false)
        : done(null, true);
    });
  }
}
