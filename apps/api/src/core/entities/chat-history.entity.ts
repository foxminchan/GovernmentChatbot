import { User } from './user.entity';
import { Topic } from './topic.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ChatHistory {
  @ApiProperty()
  id: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  topic_id: string;

  @ApiProperty()
  topics: Topic;

  @ApiProperty()
  chat_type: number;
}
