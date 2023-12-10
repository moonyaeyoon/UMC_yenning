import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class PostEntity {
  @ApiProperty({
    example: 1,
    description: '인덱스',
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 1,
    description: '게시판 id',
    required: true,
  })
  @IsInt()
  boardId: number;

  @ApiProperty({
    example: 1,
    description: '유저 id',
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: '게시글 제목입니다.',
    description: '게시글 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @ApiProperty({
    example: '게시글 내용입니다. (추후에 html이 될 수도 있습니다)',
    description: '게시글 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 10,
    description: '게시글 조회수',
    required: true,
  })
  @IsInt()
  hit: number;

  @ApiProperty({
    example: 10,
    description: '게시글 좋아요 수',
    required: true,
  })
  @IsInt()
  like: number;

  @ApiProperty({
    example: 10,
    description: '게시글 싫어요 수',
    required: true,
  })
  @IsInt()
  dislike: number;

  @ApiProperty({
    example: 10,
    description: '게시글 스크랩 수',
    required: true,
  })
  @IsInt()
  scrap: number;

  @ApiProperty({
    example: 10,
    description: '게시글 신고 수',
    required: true,
  })
  @IsInt()
  report: number;

  @ApiProperty({
    example: true,
    description: '게시글 익명 여부',
    required: true,
  })
  @IsBoolean()
  isAnonymous: boolean;

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
