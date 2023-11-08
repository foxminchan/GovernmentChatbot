import { ApiProperty } from '@nestjs/swagger';

export class Topic {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
