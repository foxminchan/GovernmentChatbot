import { Module } from '@nestjs/common';
import { AccountModule } from '../../usecase';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from '../../strategies';
import { JwtConstants } from '../../constants/jwt.constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '120m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
