import { PartialType } from '@nestjs/swagger';
import { BoardEntity } from '../model/board.entity';

export class AllBoardInfoDto extends PartialType(BoardEntity) {}

export class BoardInfoDto {
  majorId: number;
  majorName: string;
  boardId: number;
  boardName: string;
  isCanAnonymous: boolean;
}
