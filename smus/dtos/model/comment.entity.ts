import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CommentEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 1,
    description: '게시글 id',
    required: true,
  })
  @IsInt()
  postId: number;

  @ApiProperty({
    example: 1,
    description: '유저 id',
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: '댓글 내용입니다.',
    description: '댓글 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: true,
    description: '댓글 익명 여부',
    required: true,
  })
  @IsBoolean()
  isAnonymous: boolean;

  @ApiProperty({
    example: 1,
    description: '부모 댓글의 id (대댓글 까지만 가능)',
    required: true,
  })
  @IsInt()
  @IsOptional()
  parentId: number | null;

  @ApiProperty({
    example: 10,
    description: '댓글 좋아요 개수',
    required: true,
  })
  @IsInt()
  like: number;

  @ApiProperty({
    example: 10,
    description: '댓글 싫어요 개수',
    required: true,
  })
  @IsInt()
  dislike: number;

  @ApiProperty({
    example: 10,
    description: '댓글 신고 수',
    required: true,
  })
  @IsInt()
  report: number;

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
