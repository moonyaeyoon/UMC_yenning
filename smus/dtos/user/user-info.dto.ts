import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../model/user.entity';

export class UserInfoDto extends OmitType(UserEntity, ['password'] as const) {}
