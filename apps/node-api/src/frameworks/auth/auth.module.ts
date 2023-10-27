import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AccountModule } from '../../modules';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from '../../libs/strategies';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../libs/@types/constants';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  providers: [LocalStrategy, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
