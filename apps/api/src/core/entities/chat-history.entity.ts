import { User } from './user.entity';
import { Topic } from './topic.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ChatHistory {
  @ApiProperty()
  id: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;

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
}
