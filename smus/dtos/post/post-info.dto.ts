import { PartialType } from '@nestjs/swagger';
import { PostEntity } from '../model/post.entity';

export class PostInfoDto extends PartialType(PostEntity) {}
