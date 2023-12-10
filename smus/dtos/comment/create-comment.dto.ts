import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../model/comment.entity';

export class CreateCommentDto extends PickType(CommentEntity, [
  'userId', //TODO: 토큰 적용 시 나중에 삭제 필요
  'postId',
  'content',
  'isAnonymous',
] as const) {}
