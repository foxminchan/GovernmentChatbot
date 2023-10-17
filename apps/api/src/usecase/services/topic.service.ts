import { Injectable } from '@nestjs/common';
import { DataService } from '../../frameworks';

@Injectable()
export class TopicService {
  constructor(private readonly dataService: DataService) {}

  getTopics() {
    return this.dataService.topic.findMany();
  }
}
