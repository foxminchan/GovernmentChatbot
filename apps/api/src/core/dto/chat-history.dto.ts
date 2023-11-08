import { ChatType } from '../../libs/@types/enums';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChatHistoryDto {
  @ApiProperty()
  @IsString({ message: 'Nội dung tin nhắn phải là chuỗi' })
  @IsNotEmpty({ message: 'Nội dung tin nhắn không được để trống' })
  @MaxLength(1000, { message: 'Nội dung tin nhắn không được quá 1000 ký tự' })
  message: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  topic_id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Loại tin nhắn không được để trống' })
  @IsEnum(ChatType, { message: 'Loại tin nhắn phải là 0 hoặc 1' })
  chat_type: number = ChatType.HUMAN;
}

export class UpdateChatHistoryDto extends PartialType(CreateChatHistoryDto) {}
