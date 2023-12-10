import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MajorAuthReportEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: '학과 인증 이미지. 이미지가 저장된 곳의 url이 필요합니다.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @ApiProperty({
    example: '제가 학교를 조금 오래 다녀서 99학번인데 가입 가능한가요?',
    description: '학과 인증 이미지에 대한 부가 설명',
    required: true,
  })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({
    example: 1,
    description: '유저 id',
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '생성 일자',
    required: false,
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '수정 일자',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  updatedAt: Date | null;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '삭제 일자',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  deletedAt: Date | null;
}
