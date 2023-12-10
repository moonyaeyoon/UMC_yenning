import { PartialType, PickType } from '@nestjs/swagger';
import { PostEntity } from '../model/post.entity';

export class FindPostOptionsDto extends PartialType(
  PickType(PostEntity, ['id'] as const),
) {}

export class FindManyPostOptionsDto extends PartialType(
  PickType(PostEntity, ['userId', 'boardId'] as const),
) {}
