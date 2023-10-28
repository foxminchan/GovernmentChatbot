import { Injectable } from '@nestjs/common';
import { DataService } from '../../frameworks';
import { CreateTopicDto, UpdateTopicDto } from '../../core';

@Injectable()
export class TopicService {
  constructor(private readonly dataService: DataService) {}

  getTopics() {
    return this.dataService.topic.findMany();
  }

  getTopic(id: string) {
    return this.dataService.topic.findUnique({
      where: { id: id },
    });
  }

  addTopic(topic: CreateTopicDto) {
    return this.dataService.$transaction([
      this.dataService.topic.create({
        data: topic,
      }),
    ]);
  }

  updateTopic(id: string, topic: UpdateTopicDto) {
    return this.dataService.$transaction([
      this.dataService.topic.update({
        where: { id: id },
        data: topic,
      }),
    ]);
  }

  deleteTopic(id: string) {
    return this.dataService.$transaction([
      this.dataService.topic.delete({
        where: { id: id },
      }),
    ]);
  }
}
