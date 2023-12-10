import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class UserLikeCommentEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 1,
    description: '댓글 id',
    required: true,
  })
  @IsInt()
  commentId: number;

  @ApiProperty({
    example: 1,
    description: '유저 id',
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: null,
    description: '댓글 좋아요/싫어요/null 여부 (true/false/null)',
    required: true,
  })
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  isLike: boolean | null;

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
