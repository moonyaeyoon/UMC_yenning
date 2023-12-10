import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MajorEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: '컴퓨터과학과',
    description: '학과 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  majorName: string;

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
