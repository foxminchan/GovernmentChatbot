import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
