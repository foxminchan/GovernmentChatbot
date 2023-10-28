import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AccountModule } from '../../modules';
import { PassportModule } from '@nestjs/passport';
import { Module, forwardRef } from '@nestjs/common';
import { JwtStrategy, LocalStrategy } from '../../libs/strategies';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../libs/constants';

@Module({
  imports: [
    forwardRef(() => AccountModule),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}