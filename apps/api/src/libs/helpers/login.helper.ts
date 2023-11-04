import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên tài khoản hoặc email không được để trống' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
}
