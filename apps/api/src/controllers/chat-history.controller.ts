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
import { HuggingFaceService } from '../frameworks';

@ApiTags('Chat History')
@Controller('chat-history')
export class ChatHistoryController {
  constructor(
    private readonly chatHistoryService: ChatHistoryService,
    private readonly huggingFaceService: HuggingFaceService
  ) {}

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

  @Get(':id')
  getChatHistory(@Param('id') id: string) {
    return this.chatHistoryService.getChatHistory(id);
  }

  @Post()
  addChatHistory(@Body() chatHistory: CreateChatHistoryDto) {
    return this.chatHistoryService.addChatHistory(chatHistory);
  }

  @Get('huggingface/:text')
  async getHuggingFace(@Param('text') text: string) {
    if (text) {
      return this.huggingFaceService.getClassification(text);
    } else {
      return { error: 'Bad request' };
    }
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
