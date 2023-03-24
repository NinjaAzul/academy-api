import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

//BD Module
import { PrismaService } from '@libs/prisma-client';

//Auth Entity
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

//Users Entity
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository, PrismaService],
})
export class AuthModule {}
