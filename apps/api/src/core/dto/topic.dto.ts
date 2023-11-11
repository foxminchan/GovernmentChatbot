import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên chủ đề không được để trống' })
  @MaxLength(50, { message: 'Tên chủ đề không được quá 50 ký tự' })
  @IsString({ message: 'Tên chủ đề phải là chuỗi' })
  name: string;
}

export class UpdateTopicDto extends PartialType(CreateTopicDto) {}
