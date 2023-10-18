import { Injectable } from '@nestjs/common';
import { DataService } from '../../frameworks';
import { CreateChatHistoryDto, UpdateChatHistoryDto } from '../../core';

@Injectable()
export class ChatHistoryService {
  constructor(private readonly dataService: DataService) {}

  getChatHistories() {
    return this.dataService.chatHistory.findMany();
  }

  getPaginatedChatHistories(page: number, limit: number) {
    return this.dataService.chatHistory.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  getChatHistory(id: string) {
    return this.dataService.chatHistory.findUnique({
      where: { id: id },
    });
  }

  addChatHistory(chatHistory: CreateChatHistoryDto) {
    return this.dataService.chatHistory.create({
      data: chatHistory,
    });
  }

  updateChatHistory(id: string, chatHistory: UpdateChatHistoryDto) {
    return this.dataService.chatHistory.update({
      where: { id: id },
      data: chatHistory,
    });
  }

  deleteChatHistory(id: string) {
    return this.dataService.chatHistory.delete({
      where: { id: id },
    });
  }
}
