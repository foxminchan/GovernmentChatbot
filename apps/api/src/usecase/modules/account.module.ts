import { Module } from '@nestjs/common';
import { AccountService } from '../services';

@Module({
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
