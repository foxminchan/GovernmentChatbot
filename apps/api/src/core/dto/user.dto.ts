import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @MaxLength(50, { message: 'Họ tên không được quá 50 ký tự' })
  @IsString({ message: 'Họ tên phải là chuỗi' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(50, { message: 'Email không được quá 50 ký tự' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @MaxLength(10, { message: 'Số điện thoại không được quá 10 ký tự' })
  @Matches(/^\d*$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @MaxLength(100, { message: 'Địa chỉ không được quá 100 ký tự' })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Thông tin CMND/CCCD không được để trống' })
  @MaxLength(12, { message: 'Thẻ căn cước không được quá 12 ký tự' })
  @MinLength(9, { message: 'Số chứng minh nhân dân không được dưới 9 ký tự' })
  id_card: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
