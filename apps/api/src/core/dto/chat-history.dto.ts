import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChatHistoryDto {
  @ApiProperty()
  @IsString({ message: 'Câu hỏi phải là chuỗi' })
  @IsNotEmpty({ message: 'Câu hỏi không được để trống' })
  @MaxLength(100, { message: 'Câu hỏi không được quá 1000 ký tự' })
  question: string;

  @ApiProperty()
  @IsString({ message: 'Nội dung tin nhắn phải là chuỗi' })
  @IsNotEmpty({ message: 'Nội dung tin nhắn không được để trống' })
  answer: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  topic_id: string;
}

export class UpdateChatHistoryDto extends PartialType(CreateChatHistoryDto) {}
