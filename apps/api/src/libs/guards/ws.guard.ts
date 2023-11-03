import { JwtService } from '@nestjs/jwt';
import { AccontService } from '../../modules';
import { WsException } from '@nestjs/websockets';
import { ThrottlerException, ThrottlerStorage } from '@nestjs/throttler';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccontService,
    private readonly storageService: ThrottlerStorage
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToWs().getClient().handshake;
    const payload = await this.jwtService.verify(request.headers.authorization);
    const user = await this.accountService.findUser(payload.email);

    if (!user) throw new WsException('Unauthorized access');

    request.user = user;

    const { totalHits } = await this.storageService.increment(user.id, 60);
    if (totalHits > 30) throw new ThrottlerException('Too Many Requests');

    return true;
  }
}
