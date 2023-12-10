// reset.controller.ts

import { Controller, Get } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller('debug')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Get('reset-database')
  async resetDatabase() {
    try {
      const result = await this.resetService.resetDB();
      console.log(result); // 콘솔에 결과를 출력

      return { message: 'Database reset completed.' };
    } catch (error: any) {
      console.error('Error resetting the database:', error);
      return { error: 'Error resetting the database.', details: error.message };
    }
  }
}
