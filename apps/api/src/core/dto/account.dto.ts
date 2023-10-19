import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @MaxLength(50, { message: 'Tên đăng nhập không được quá 50 ký tự' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số',
  })
  password: string;

  @ApiProperty()
  user_id: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
