import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: '202310123',
    description: '학번 혹은 임직원 번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @ApiProperty({
    example: 'example@google.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'abcd1234',
    description: '비밀번호. 8~16자리의 영문, 숫자 조합(특수문자 허용)',
    required: true,
    maxLength: 16,
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 1,
    description: '유저 역할 (학생, 임직원 등)',
    required: true,
  })
  @IsInt()
  roleId: number;

  @ApiProperty({
    example: 'smus관리자',
    description: '닉네임. 중복 불가',
    required: true,
  })
  @IsString()
  @IsOptional()
  nickname: string | null;

  @ApiProperty({
    description: '프로필 사진. 이미지가 저장된 곳의 url이 필요합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  profileImgUrl: string | null;

  @ApiProperty({
    example: true,
    description: '이메일 인증 확인 여부',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isAuthenticated: boolean | null;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '회원가입 일자',
    required: false,
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '최근 사용자 정보 업데이트 일자',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  updatedAt: Date | null;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '회원 탈퇴 일자',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  deletedAt: Date | null;
}
