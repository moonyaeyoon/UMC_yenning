import { PartialType, PickType } from '@nestjs/swagger';
import { UserMajorEntity } from '../model/user-major.entity';

export class FindUserMajorsOptionsDto extends PartialType(
  PickType(UserMajorEntity, ['userId', 'majorId'] as const),
) {}
