import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../model/user.entity';

export class FindUserOptionsDto extends PartialType(
  PickType(UserEntity, [
    'id',
    'email',
    'nickname',
    'roleId',
    'schoolId',
    'isAuthenticated',
  ] as const),
) {}
