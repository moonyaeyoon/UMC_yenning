import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class BoardEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: '자유게시판',
    description: '게시판 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  boardName: string;

  @ApiProperty({
    example: true,
    description: '익명 게시판 여부',
    required: true,
  })
  @IsBoolean()
  isCanAnonymous: boolean;

  @ApiProperty({
    example: 1,
    description: '학과 id',
    required: true,
  })
  @IsInt()
  majorId: number;

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
