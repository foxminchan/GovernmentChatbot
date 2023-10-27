import { TopicService } from '../modules';
import { GenericController } from '../libs/decorators';
import { CreateTopicDto, UpdateTopicDto } from '../core';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';

@GenericController('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  getTopics() {
    return this.topicService.getTopics();
  }

  @Get(':id')
  getTopic(@Param('id') id: string) {
    return this.topicService.getTopic(id);
  }

  @Post()
  addTopic(@Body() topic: CreateTopicDto) {
    return this.topicService.addTopic(topic);
  }

  @Put(':id')
  updateTopic(@Param('id') id: string, @Body() topic: UpdateTopicDto) {
    return this.topicService.updateTopic(id, topic);
  }

  @Delete(':id')
  deleteTopic(@Param('id') id: string) {
    return this.topicService.deleteTopic(id);
  }
}
