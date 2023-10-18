import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
