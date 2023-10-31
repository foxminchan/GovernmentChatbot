import {
  CreateChatHistoryDto,
  ResponseChatHistoryDto,
  UpdateChatHistoryDto,
} from '../core';
import { ChatHistoryService } from '../modules';
import {
  ApiController,
  PagingSwaggerResponse,
  SwaggerResponse,
} from '../libs/decorators';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Criteria } from '../libs/helpers';

@ApiController('chat-history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Get()
  @SwaggerResponse({
    operation: 'Chat history fetch',
    response: ResponseChatHistoryDto,
  })
  getChatHistories() {
    return this.chatHistoryService.getChatHistories();
  }

  @Get('filter')
  @PagingSwaggerResponse({
    operation: 'Chat history fetch with pagination',
    response: ResponseChatHistoryDto,
  })
  getPaginatedChatHistories(@Query() criteria: Criteria) {
    return this.chatHistoryService.getFilterChatHistories(criteria);
  }

  @Get('user/:userId')
  @PagingSwaggerResponse({
    operation: 'Chat history fetch by user id with pagination',
    params: ['userId'],
    response: ResponseChatHistoryDto,
  })
  getByUserId(@Param('userId') userId: string, @Query() criteria: Criteria) {
    return this.chatHistoryService.getByUserId(userId, criteria);
  }

  @Get(':id')
  @SwaggerResponse({
    operation: 'Chat history fetch by id',
    params: ['id'],
    response: ResponseChatHistoryDto,
  })
  getChatHistory(@Param('id') id: string) {
    return this.chatHistoryService.getChatHistory(id);
  }

  @Post()
  @SwaggerResponse({
    operation: 'Create chat history',
    body: CreateChatHistoryDto,
  })
  addChatHistory(@Body() chatHistory: CreateChatHistoryDto) {
    return this.chatHistoryService.addChatHistory(chatHistory);
  }

  @Put(':id')
  @SwaggerResponse({
    operation: 'Update chat history',
    params: ['id'],
    body: UpdateChatHistoryDto,
  })
  updateChatHistory(
    @Param('id') id: string,
    @Body() chatHistory: UpdateChatHistoryDto
  ) {
    return this.chatHistoryService.updateChatHistory(id, chatHistory);
  }

  @Delete(':id')
  @SwaggerResponse({
    operation: 'Delete chat history',
    params: ['id'],
  })
  deleteChatHistory(@Param('id') id: string) {
    return this.chatHistoryService.deleteChatHistory(id);
  }
}
