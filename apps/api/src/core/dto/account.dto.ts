import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên tài khoản không được để trống' })
  @MaxLength(50, { message: 'Tên tài khoản không được quá 50 ký tự' })
  @IsString({ message: 'Tên tài khoản phải là chuỗi' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(
    /(?=(?>.*\d))(?=(?>.*[!@#$%^&*()[\]{}\-_+=~`|:;"'<>,./?]))(?=(?>.*[a-z]))(?=(?>.*[A-Z]))(?=(?>.*)).{8,}/,
    {
      message:
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số',
    }
  )
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  @IsString({ message: 'Vai trò phải là chuỗi' })
  role: string;

  @ApiProperty()
  claim: string[];

  @ApiProperty()
  user_id: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}

export class ResponseAccountDto extends PartialType(CreateAccountDto) {
  @ApiProperty()
  id: string;
}
