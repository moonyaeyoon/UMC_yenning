import { PartialType } from '@nestjs/swagger';
import { CommentEntity } from '../model/comment.entity';

export class CommentInfoDto extends PartialType(CommentEntity) {}
