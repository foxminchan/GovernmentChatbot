import { Module } from '@nestjs/common';
import { AccontService } from './account.service';

@Module({
  providers: [AccontService],
  exports: [AccontService],
})
export class AccountModule {}
