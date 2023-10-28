import { TopicService } from '../modules';
import { ApiController, SwaggerResponse } from '../libs/decorators';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTopicDto, ResponseTopicDto, UpdateTopicDto } from '../core';

@ApiController('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @SwaggerResponse({
    operation: 'Topic fetch',
    response: ResponseTopicDto,
  })
  getTopics() {
    return this.topicService.getTopics();
  }

  @Get(':id')
  @SwaggerResponse({
    operation: 'Topic fetch by id',
    params: ['id'],
    response: ResponseTopicDto,
  })
  getTopic(@Param('id') id: string) {
    return this.topicService.getTopic(id);
  }

  @Post()
  @SwaggerResponse({
    operation: 'Create topic',
    body: CreateTopicDto,
  })
  addTopic(@Body() topic: CreateTopicDto) {
    return this.topicService.addTopic(topic);
  }

  @Put(':id')
  @Post()
  @SwaggerResponse({
    operation: 'Update topic',
    params: ['id'],
    body: UpdateTopicDto,
  })
  updateTopic(@Param('id') id: string, @Body() topic: UpdateTopicDto) {
    return this.topicService.updateTopic(id, topic);
  }

  @Delete(':id')
  @SwaggerResponse({
    operation: 'Delete topic',
    params: ['id'],
  })
  deleteTopic(@Param('id') id: string) {
    return this.topicService.deleteTopic(id);
  }
}
