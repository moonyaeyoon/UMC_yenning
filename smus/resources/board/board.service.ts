// board.service.ts
import { Injectable } from '@nestjs/common';
import { BoardInfoDto } from '../../dtos/board/board-info.dto';
import { BoardPreviewDto } from 'src/dtos/board/board-preview.dto';
import { BoardRepository } from '../../repositories/board.repository';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  //getMajorBoards
  async getMajorBoards(majorId: number) {
    return this.boardRepository.getMajorBoards(majorId);
  }

  //getBoardInfo
  async getBoardInfoById(boardId: number): Promise<BoardInfoDto | null> {
    return this.boardRepository.getBoardInfoById(boardId);
  }

  //getBoardInfoByPostId
  async getBoardInfoByPostId(postId: number): Promise<BoardInfoDto | null> {
    return this.boardRepository.getBoardInfoByPostId(postId);
  }

  //getBoardPreview;
  async getBoardPreview(
    boardId: number,
    limitPostNum: number,
  ): Promise<BoardPreviewDto[] | null> {
    return this.boardRepository.getBoardPreview(boardId, limitPostNum);
  }
}
