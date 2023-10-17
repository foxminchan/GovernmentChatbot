import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChatHistoryDto {
  @IsString({ message: 'Nội dung tin nhắn phải là chuỗi' })
  @MaxLength(1000, { message: 'Nội dung tin nhắn không được quá 1000 ký tự' })
  @IsNotEmpty({ message: 'Nội dung tin nhắn không được để trống' })
  message: string;

  date: Date;

  user_id: string;

  topic_id: string[];
}

export class UpdateChatHistoryDto extends PartialType(CreateChatHistoryDto) {}
