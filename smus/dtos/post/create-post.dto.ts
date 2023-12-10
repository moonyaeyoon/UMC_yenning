import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../model/post.entity';

export class CreatePostDto extends PickType(PostEntity, [
  'userId',
  'boardId',
  'title',
  'content',
  'isAnonymous',
]) {}
