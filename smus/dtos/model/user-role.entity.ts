import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserRoleEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: '학생',
    description: '사용자 역할 (학생, 임직원 등)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  role: string;

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
