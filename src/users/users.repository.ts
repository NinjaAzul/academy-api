import { Injectable } from '@nestjs/common';

//BD
import { PrismaService } from '@libs/prisma-client';

//Types
import { User } from '@prisma/client';
import { UserCreateDto } from './dto/user.create.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        user: true,
        person: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        user: true,
        person: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByName(username: string) {
    return await this.prismaService.user.findUnique({
      where: {
        user: username,
      },
    });
  }

  async create(data: UserCreateDto) {
    return await this.prismaService.user.create({
      data: {
        user: data.user,
        password: data.password,
        person: {
          create: {
            name: data.name,
          },
        },
        roleId: data.roleId,
      },
      select: {
        id: true,
        user: true,
        person: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, data: User) {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async delete(id: string) {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async validateUser(data: AuthDto) {
    return await this.prismaService.user.findFirst({
      where: {
        user: data.user,
      },
    });
  }
}
