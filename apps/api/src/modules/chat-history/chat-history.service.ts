import { Injectable } from '@nestjs/common';
import { DataService } from '../../frameworks';
import { Criteria, constructQueryOptions } from '../../libs/helpers';
import { CreateChatHistoryDto, UpdateChatHistoryDto } from '../../core';

@Injectable()
export class ChatHistoryService {
  constructor(private readonly dataService: DataService) {}

  getChatHistories() {
    return this.dataService.chatHistory.findMany();
  }

  getFilterChatHistories(criteria: Criteria) {
    const queryOptions = constructQueryOptions(criteria);
    return this.dataService.chatHistory.findMany(queryOptions);
  }

  getByUserId(userId: string, criteria: Criteria) {
    const queryOptions = constructQueryOptions(criteria, {
      where: { user_id: userId },
    });
    return this.dataService.chatHistory.findMany(queryOptions);
  }

  getChatHistory(id: string) {
    return this.dataService.chatHistory.findUnique({
      where: { id: id },
    });
  }

  addChatHistory(chatHistory: CreateChatHistoryDto) {
    return this.dataService.$transaction([
      this.dataService.chatHistory.create({
        data: chatHistory,
      }),
    ]);
  }

  updateChatHistory(id: string, chatHistory: UpdateChatHistoryDto) {
    return this.dataService.$transaction([
      this.dataService.chatHistory.update({
        where: { id: id },
        data: chatHistory,
      }),
    ]);
  }

  deleteChatHistory(id: string) {
    return this.dataService.$transaction([
      this.dataService.chatHistory.delete({
        where: { id: id },
      }),
    ]);
  }
}
