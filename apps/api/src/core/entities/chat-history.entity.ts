import { User } from './user.entity';
import { Topic } from './topic.entity';

export class ChatHistory {
  id: string;
  message: string;
  date: Date;
  user: User;
  topics: Topic;
  chat_type: number;
}
