import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ChatBody {
  @IsString({ message: 'Tin nhắn phải là chuỗi' })
  @MaxLength(250, { message: 'Tin nhắn tối đa 250 ký tự' })
  @IsNotEmpty({ message: 'Tin nhắn không được để trống' })
  message: string;

  @IsNotEmpty({ message: 'ID người dùng không được để trống' })
  user_id: string;

  @IsNotEmpty({ message: 'ID chủ đề không được để trống' })
  topic_id: string;
}
