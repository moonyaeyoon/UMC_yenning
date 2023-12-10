import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../model/user.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends PickType(UserEntity, [
  'schoolId',
  'password',
  'roleId',
  'nickname',
] as const) {
  @ApiProperty({
    example: 'abcd1234',
    description: '비밀번호 확인',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}

export class CreateUserWithEmailDto extends PickType(UserEntity, [
  'schoolId',
  'password',
  'roleId',
  'nickname',
  'email',
]) {}

export class SendEmailDto extends PickType(UserEntity, [
  'schoolId',
  'roleId',
] as const) {}

export class VerifyEmailDto extends PickType(UserEntity, [
  'schoolId',
  'roleId',
] as const) {
  @ApiProperty({
    example: 12345678,
    description: '이메일 인증번호 8자리',
    required: true,
  })
  @IsInt()
  code: number;
}
