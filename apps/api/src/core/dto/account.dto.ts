import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Claims, Roles } from '../../libs/@types/enums';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên tài khoản không được để trống' })
  @MaxLength(50, { message: 'Tên tài khoản không được quá 50 ký tự' })
  @IsString({ message: 'Tên tài khoản phải là chuỗi' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số',
    }
  )
  password: string;

  @ApiProperty()
  @IsEnum(Roles, { each: true, message: 'Vai trò phải là ADMIN hoặc CITIZEN' })
  role: string = Roles.CITIZEN;

  @ApiProperty()
  @IsEnum(Claims, {
    each: true,
    message: 'Quyền phải là manager, create, read, update hoặc delete',
  })
  claim: string[] = [Claims.Read, Claims.Create];

  @ApiProperty()
  user_id: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}

export class ResponseAccountDto extends PartialType(CreateAccountDto) {
  @ApiProperty()
  id: string;
}
