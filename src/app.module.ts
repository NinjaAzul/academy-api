import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';

//Modules App
import { UsersModule } from './users/users.module';
import { PrismaClientModule } from '@libs/prisma-client';
import { AuthModule } from './auth/auth.module';

//Services
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

//Repositories
import { UsersRepository } from './users/users.repository';

//Pipes
import { ValidationPipe } from './@shared/pipes/validation.pipe';

//Strategies
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [UsersModule, PrismaClientModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    LocalStrategy,
    JwtStrategy,
    AuthService,
    UsersService,
    UsersRepository,
    JwtService,
  ],
})
export class AppModule {}
