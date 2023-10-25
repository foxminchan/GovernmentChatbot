import { Topic } from './topic.entity';
import { User } from './user.entity';

export class ChatHistory {
  message: string;
  date: Date;
  user: User;
  topics: Topic[];
}
