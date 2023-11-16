import { CreateUserDto } from '../../core';
import { ApiProperty } from '@nestjs/swagger';

export class AccountPayload {
  @ApiProperty()
  user: CreateUserDto;

  @ApiProperty()
  password: string;
}
