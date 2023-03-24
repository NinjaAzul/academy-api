import { Module } from '@nestjs/common';

//BD Module
import { PrismaService } from '@libs/prisma-client';

//Users Entity
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

//Guards
import { PermissionsGuard } from '../@shared/guards/permissions.guard';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, PermissionsGuard],
})
export class UsersModule {}
