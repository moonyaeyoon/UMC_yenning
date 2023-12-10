// board.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { BoardEntity } from 'src/dtos/model/board.entity';
import { AllBoardInfoDto, BoardInfoDto } from 'src/dtos/board/board-info.dto';
import { BoardPreviewDto } from 'src/dtos/board/board-preview.dto';
import {
  FindBoardOptionsDto,
  FindManyBoardOptionsDto,
} from 'src/dtos/board/find-board-options.dto';

@Injectable()
export class BoardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMajorBoards(majorId: number): Promise<BoardEntity[]> {
    return this.prisma.board.findMany({
      where: { majorId },
    });
  }

  async getBoardInfoById(boardId: number): Promise<BoardInfoDto | null> {
    const NOW_BOARD = Number(boardId);
    const board = await this.prisma.board.findUnique({
      where: { id: NOW_BOARD },
    });

    if (!board) {
      return null;
    }

    const major = await this.prisma.major.findUnique({
      where: { id: board.majorId },
    });

    return {
      majorId: major?.id || 0,
      majorName: major?.majorName || '',
      boardId: board.id,
      boardName: board.boardName,
      isCanAnonymous: board.isCanAnonymous,
    };
  }

  async getBoardInfoByPostId(postId: number): Promise<BoardInfoDto | null> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return null;
    }

    const board = await this.prisma.board.findUnique({
      where: { id: post.boardId },
    });

    if (!board) {
      return null;
    }

    const major = await this.prisma.major.findUnique({
      where: { id: board.majorId },
    });

    return {
      majorId: major?.id || 0,
      majorName: major?.majorName || '',
      boardId: board.id,
      boardName: board.boardName,
      isCanAnonymous: board.isCanAnonymous,
    };
  }

  async getBoardPreview(
    boardId: number,
    limitPostNum: number,
  ): Promise<BoardPreviewDto[] | null> {
    const NOW_BOARD = Number(boardId);
    const board = await this.prisma.board.findUnique({
      where: { id: NOW_BOARD },
    });

    if (!board) {
      return null;
    }

    const posts = await this.prisma.post.findMany({
      where: { boardId: NOW_BOARD }, // boardId를 숫자로 변환하여 전달
      orderBy: { createdAt: 'desc' },
      take: limitPostNum,
    });

    const boardPreview: BoardPreviewDto[] = [];

    for (const post of posts) {
      const comments = await this.prisma.comment.count({
        where: { postId: post.id },
      });

      boardPreview.push({
        postId: post.id,
        title: post.title,
        comments: comments,
        createdTime: post.createdAt.toISOString(),
        likes: post.like,
      });
    }

    return boardPreview;
  }

  async findBoardByOptions(
    options: FindBoardOptionsDto,
    getSoftDeleted: boolean,
  ): Promise<AllBoardInfoDto | null> {
    const newOptions = getSoftDeleted
      ? {
          ...options,
        }
      : {
          ...options,
          deletedAt: null,
        };

    const board = await this.prisma.board.findFirst({
      where: { ...newOptions },
    });
    return board;
  }

  async findManyBoardByOptions(
    options: FindManyBoardOptionsDto,
    getSoftDeleted: boolean,
  ): Promise<Array<AllBoardInfoDto>> {
    const newOptions = getSoftDeleted
      ? {
          ...options,
        }
      : {
          ...options,
          deletedAt: null,
        };

    const boards = await this.prisma.board.findMany({
      where: { ...newOptions },
    });
    return boards;
  }
}
