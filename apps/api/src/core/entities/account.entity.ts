import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class Account {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  claim: string[];

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  user: User;
}
