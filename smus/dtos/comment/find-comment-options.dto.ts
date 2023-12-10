import { PartialType, PickType } from '@nestjs/swagger';
import { CommentEntity } from '../model/comment.entity';

export class FindCommentOptionsDto extends PartialType(
  PickType(CommentEntity, ['id'] as const),
) {}

export class FindManyCommentOptionsDto extends PartialType(
  PickType(CommentEntity, ['postId', 'userId', 'parentId'] as const),
) {}
