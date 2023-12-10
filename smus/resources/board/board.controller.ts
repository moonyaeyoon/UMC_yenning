import { Controller, Get, Param, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardInfoDto } from '../../dtos/board/board-info.dto';
import { BoardPreviewDto } from 'src/dtos/board/board-preview.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //getMajorBoards
  @Get('list/:majorId')
  async getMajorBoards(@Param('majorId') majorId: number) {
    // Convert majorId to number if needed
    const numericMajorId = Number(majorId);
    const boardList = await this.boardService.getMajorBoards(numericMajorId);
    return { boardList };
  }

  //getBoardInfo
  @Get('info/:boardId')
  async getBoardInfo(
    @Param('boardId') boardId: number,
  ): Promise<BoardInfoDto | null> {
    return this.boardService.getBoardInfoById(boardId);
  }

  //getBoardByPostId
  @Get('info_by_postid/:postId')
  async getBoardInfoByPostId(
    @Param('postId') postId: number,
  ): Promise<BoardInfoDto | null> {
    return this.boardService.getBoardInfoByPostId(postId);
  }

  //getBoardPreview
  @Get(':boardId/preview')
  async getBoardPreview(
    @Param('boardId') boardId: number,
    @Query('limitPostNum') limitPostNum: number,
  ): Promise<BoardPreviewDto[] | null> {
    return this.boardService.getBoardPreview(boardId, limitPostNum);
  }
}
