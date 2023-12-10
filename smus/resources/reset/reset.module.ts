import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { ResetRepository } from '../../repositories/reset.repository';
import { UserRepository } from '../../repositories/user.repository';

@Module({
  controllers: [ResetController],
  providers: [ResetService, ResetRepository, UserRepository, PrismaModule],
})
export class ResetModule {}
