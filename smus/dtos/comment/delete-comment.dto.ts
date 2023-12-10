import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../model/comment.entity';

export class DeleteCommentDto extends PickType(CommentEntity, [
  'id',
  'userId', //TODO: 토큰 적용 시 나중에 삭제 필요
] as const) {}
