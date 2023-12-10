import { PartialType } from '@nestjs/swagger';
import { UserMajorEntity } from '../model/user-major.entity';

export class UserMajorInfoDto extends PartialType(UserMajorEntity) {}
