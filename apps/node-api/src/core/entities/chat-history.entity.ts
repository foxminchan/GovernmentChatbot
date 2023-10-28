import { User } from './user.entity';
import { Topic } from './topic.entity';

export class ChatHistory {
  message: string;
  date: Date;
  user: User;
  topics: Topic;
}
