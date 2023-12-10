import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UserReportCommentEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 1,
    description: '유저 id',
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 1,
    description: '댓글 id',
    required: true,
  })
  @IsInt()
  commentId: number;

  @ApiProperty({
    example: '비방/비하 발언',
    description: '댓글 신고 사유',
    required: false,
  })
  @IsString()
  @IsOptional()
  content: string | null;

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
