import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateChatHistoryDto {
  @ApiProperty()
  @IsString({ message: 'Nội dung tin nhắn phải là chuỗi' })
  @MaxLength(1000, { message: 'Nội dung tin nhắn không được quá 1000 ký tự' })
  @IsNotEmpty({ message: 'Nội dung tin nhắn không được để trống' })
  message: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  topic_id: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Loại tin nhắn phải là số' })
  @IsNotEmpty({ message: 'Loại tin nhắn không được để trống' })
  chat_type: number;
}

export class UpdateChatHistoryDto extends PartialType(CreateChatHistoryDto) {}

export class ResponseChatHistoryDto extends PartialType(CreateChatHistoryDto) {
  @ApiProperty()
  id: string;
}
