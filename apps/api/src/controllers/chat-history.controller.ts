import {
  ChatHistory,
  CreateChatHistoryDto,
  UpdateChatHistoryDto,
} from '../core';
import {
  ApiController,
  Auth,
  PagingSwaggerResponse,
  SwaggerResponse,
} from '../libs/decorators';
import { Criteria } from '../libs/helpers';
import { ChatHistoryService } from '../modules';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@ApiController('chat-history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Get()
  @Auth()
  @SwaggerResponse({
    operation: 'Chat history fetch',
    response: ChatHistory,
  })
  getChatHistories() {
    return this.chatHistoryService.getChatHistories();
  }

  @Get('filter')
  @Auth()
  @PagingSwaggerResponse({
    operation: 'Chat history fetch with pagination',
    response: ChatHistory,
  })
  getPaginatedChatHistories(@Query() criteria: Criteria) {
    return this.chatHistoryService.getFilterChatHistories(criteria);
  }

  @Auth()
  @Get('user/:userId')
  @PagingSwaggerResponse({
    operation: 'Chat history fetch by user id with pagination',
    params: ['userId'],
    response: ChatHistory,
  })
  getByUserId(@Param('userId') userId: string, @Query() criteria: Criteria) {
    return this.chatHistoryService.getByUserId(userId, criteria);
  }

  @Auth()
  @Get(':id')
  @SwaggerResponse({
    operation: 'Chat history fetch by id',
    params: ['id'],
    response: ChatHistory,
  })
  getChatHistory(@Param('id') id: string) {
    return this.chatHistoryService.getChatHistory(id);
  }

  @Auth()
  @Post()
  @SwaggerResponse({
    operation: 'Create chat history',
    body: CreateChatHistoryDto,
  })
  addChatHistory(@Body() chatHistory: CreateChatHistoryDto) {
    return this.chatHistoryService.addChatHistory(chatHistory);
  }

  @Auth()
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

  @Auth()
  @Delete(':id')
  @SwaggerResponse({
    operation: 'Delete chat history',
    params: ['id'],
  })
  deleteChatHistory(@Param('id') id: string) {
    return this.chatHistoryService.deleteChatHistory(id);
  }
}
