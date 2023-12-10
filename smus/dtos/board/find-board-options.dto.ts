import { PartialType, PickType } from '@nestjs/swagger';
import { BoardEntity } from '../model/board.entity';

export class FindBoardOptionsDto extends PartialType(
  PickType(BoardEntity, ['id'] as const),
) {}

export class FindManyBoardOptionsDto extends PartialType(
  PickType(BoardEntity, ['majorId'] as const),
) {}
