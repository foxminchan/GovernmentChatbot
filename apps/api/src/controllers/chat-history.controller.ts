import {
  CreateChatHistoryDto,
  ResponseChatHistoryDto,
  UpdateChatHistoryDto,
} from '../core';
import { ApiQuery } from '@nestjs/swagger';
import { ChatHistoryService } from '../modules';
import { ApiController, SwaggerResponse } from '../libs/decorators';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

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

  @Get(':page/:limit')
  @SwaggerResponse({
    operation: 'Chat history fetch with pagination',
    params: ['page', 'limit'],
    response: ResponseChatHistoryDto,
  })
  getPaginatedChatHistories(
    @Param('page') page: number,
    @Param('limit') limit: number
  ) {
    return this.chatHistoryService.getPaginatedChatHistories(page, limit);
  }

  @Get('user/:userId')
  @SwaggerResponse({
    operation: 'Chat history fetch by user id with pagination',
    params: ['userId'],
    response: ResponseChatHistoryDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getByUserId(
    @Param('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.chatHistoryService.getByUserId(userId, page, limit);
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
