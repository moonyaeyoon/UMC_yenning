import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from '../../repositories/board.repository';
import { ResetModule } from '../../resources/reset/reset.module';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ResetModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
