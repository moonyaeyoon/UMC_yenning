import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { ResetConstants } from './reset.constants';
import { ResetRepository } from '../../repositories/reset.repository';
import { UserRepository } from '../../repositories/user.repository';

const COMMON_BOARD_LIST = ResetConstants.COMMON_BOARD_LIST;
const MAJOR_LIST = ResetConstants.MAJOR_LIST;

@Injectable()
export class ResetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resetRepository: ResetRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async resetDB() {
    // 데이터 삭제
    await this.resetRepository.deleteAllBoardMapBoardTypes();
    await this.resetRepository.deleteAllBoardTypes();
    await this.resetRepository.deleteAllBoards();
    await this.resetRepository.deleteAllUserMajors();
    await this.resetRepository.deleteAllMajors();

    const newUser = await this.userRepository.createUser({
      email: 'super',
      password: '$2b$12$r3bjYP.fhSyEt1Ychg1i/OosBxb1IaUJsw9yPuVFbLyKgzQiZTiy2',
      roleId: 1,
      schoolId: '193712345',
      nickname: '학생복지팀',
    });

    // Create BoardTypes
    for (const commonBoard of COMMON_BOARD_LIST) {
      // Create BoardType
      const boardType = await this.resetRepository.createBoardType(
        commonBoard.boardType,
      );
      console.log(boardType);
    }
    // Create Majors and Boards
    for (const majorName of MAJOR_LIST) {
      const major = await this.resetRepository.createMajor(majorName);
      console.log(major);

      // Create UserMajor
      await this.resetRepository.createUserMajor(newUser.id, major.id);
      // Create Boards for each BoardType
      for (const commonBoard of ResetConstants.COMMON_BOARD_LIST) {
        const board = await this.resetRepository.createBoard({
          boardName: `${majorName}-${commonBoard.boardType}`,
          isCanAnonymous: commonBoard.isCanAnonymous,
          majorId: major.id,
        });
        console.log(board);
      }
    }
  }
}
