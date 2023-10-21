import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChatHistoryService } from '../usecase';
import { CreateChatHistoryDto, UpdateChatHistoryDto } from '../core';

@ApiTags('Chat History')
@Controller('chat-history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Get()
  getChatHistories() {
    return this.chatHistoryService.getChatHistories();
  }

  @Get(':page/:limit')
  getPaginatedChatHistories(
    @Param('page') page: number,
    @Param('limit') limit: number
  ) {
    return this.chatHistoryService.getPaginatedChatHistories(page, limit);
  }

  @Get('user/:userId')
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
  getChatHistory(@Param('id') id: string) {
    return this.chatHistoryService.getChatHistory(id);
  }

  @Post()
  addChatHistory(@Body() chatHistory: CreateChatHistoryDto) {
    return this.chatHistoryService.addChatHistory(chatHistory);
  }

  @Put(':id')
  updateChatHistory(
    @Param('id') id: string,
    @Body() chatHistory: UpdateChatHistoryDto
  ) {
    return this.chatHistoryService.updateChatHistory(id, chatHistory);
  }

  @Delete(':id')
  deleteChatHistory(@Param('id') id: string) {
    return this.chatHistoryService.deleteChatHistory(id);
  }
}
