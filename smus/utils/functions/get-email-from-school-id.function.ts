import { BadRequestException } from '@nestjs/common';
import { USER_ROLE } from 'src/config/database/seeds/user-role.seed';
export function getEmailFromSchoolId(schoolId: string, roleId: number): string {
  let email = '';

  // 학생인 경우
  if (roleId === USER_ROLE.STUDENT) {
    email = `${schoolId}@sangmyung.kr`;
  }

  // 임직원인 경우
  if (roleId === USER_ROLE.STAFF) {
    email = `${schoolId}@smu.ac.kr`;
  }

  if (!email) {
    throw new BadRequestException('비정상적인 접근입니다.');
  }

  return email;
}
