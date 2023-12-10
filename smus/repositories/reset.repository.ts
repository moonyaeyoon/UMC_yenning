import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ResetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMajor(majorName: string) {
    return this.prisma.major.create({
      data: {
        majorName,
      },
    });
  }

  async createUserMajor(userId: number, majorId: number) {
    return this.prisma.userMajor.create({
      data: {
        userId,
        majorId,
      },
    });
  }
  async createBoardType(boardType: string) {
    return this.prisma.boardType.create({
      data: {
        type: boardType,
      },
    });
  }

  async createBoard(boardData: Prisma.BoardCreateInput) {
    return this.prisma.board.create({
      data: boardData,
    });
  }

  async createBoardMapBoardType(boardId: number, boardTypeId: number) {
    return this.prisma.boardMapBoardType.create({
      data: {
        boardId,
        boardTypeId,
      },
    });
  }
  async deleteAllMajors() {
    return this.prisma.major.deleteMany({});
  }

  async deleteAllUserMajors() {
    return this.prisma.userMajor.deleteMany({});
  }

  async deleteAllBoards() {
    return this.prisma.board.deleteMany({});
  }

  async deleteAllBoardTypes() {
    return this.prisma.boardType.deleteMany({});
  }

  async deleteAllBoardMapBoardTypes() {
    return this.prisma.boardMapBoardType.deleteMany({});
  }
}
